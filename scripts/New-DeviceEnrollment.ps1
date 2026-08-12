# ==============================================================================
# New-DeviceEnrollment.ps1 - REN Active Directory & MDM: Enrolamiento de Dispositivos
# ==============================================================================
# Descripción:
#   Script para la verificación previa y registro/enrolamiento de equipos en
#   Active Directory y el sistema MDM, exportando auditoría en formato JSON.
#
# USO (como Administrador):
#   .\New-DeviceEnrollment.ps1 -ComputerName "SRV-FIN-01" -TargetOU "OU=Workstations,DC=empresa,DC=local" -DeviceId "DEV-998234"
# ==============================================================================

[CmdletBinding()]
param(
    # Nombre de host del equipo a registrar en Active Directory
    [Parameter(Mandatory = $true, HelpMessage = "Nombre del equipo / host")]
    [ValidateNotNullOrEmpty()]
    [string]$ComputerName,

    # Unidad Organizativa (OU) de destino en formato DN
    [Parameter(Mandatory = $true, HelpMessage = "DistinguishedName de la OU destino (Ej: OU=Equipos,DC=dominio,DC=com)")]
    [ValidateNotNullOrEmpty()]
    [string]$TargetOU,

    # Identificador único de dispositivo para control MDM / Inventario
    [Parameter(Mandatory = $true, HelpMessage = "Identificador único de dispositivo MDM")]
    [ValidateNotNullOrEmpty()]
    [string]$DeviceId,

    # Ruta personalizada para exportar el log de auditoría en formato JSON (opcional)
    [string]$LogPath = "$PSScriptRoot/logs/audit-enrollment.json"
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "   REN Active Directory & MDM - Enrolamiento Dispositivo" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""

# Estructura del registro de auditoría
$auditRecord = [ordered]@{
    Timestamp     = (Get-Date).ToString("o")
    ComputerName  = $ComputerName
    TargetOU      = $TargetOU
    DeviceId      = $DeviceId
    Status        = "Iniciado"
    Details       = ""
    Success       = $false
}

# Función auxiliar para registrar la auditoría en formato JSON
function Export-AuditLog {
    param(
        [hashtable]$Record,
        [string]$Path
    )
    try {
        $logDir = Split-Path -Parent $Path
        if (-not (Test-Path -Path $logDir)) {
            New-Item -ItemType Directory -Path $logDir -Force | Out-Null
        }

        # Cargar registros existentes si la bitácora ya existe
        $existingLogs = @()
        if (Test-Path -Path $Path) {
            $rawContent = Get-Content -Path $Path -Raw -ErrorAction SilentlyContinue
            if (-not [string]::IsNullOrWhiteSpace($rawContent)) {
                $existingLogs = @($rawContent | ConvertFrom-Json)
            }
        }

        $existingLogs += [PSCustomObject]$Record
        $existingLogs | ConvertTo-Json -Depth 4 | Set-Content -Path $Path -Encoding UTF8
        Write-Host "   [LOG] Auditoria exportada exitosamente en: $Path" -ForegroundColor Gray
    }
    catch {
        Write-Host "   [ERROR] No se pudo escribir el archivo de auditoria JSON: $_" -ForegroundColor Red
    }
}

try {
    # ── 1. Verificación del módulo ActiveDirectory ─────────────────────────────
    Write-Host "[1/3] Verificando modulo de Active Directory..." -ForegroundColor Yellow
    
    $adModuleAvailable = $true
    if (-not (Get-Module -ListAvailable -Name ActiveDirectory)) {
        Write-Host "   [ADVERTENCIA] El modulo ActiveDirectory RSAT no esta instalado localmente." -ForegroundColor DarkYellow
        Write-Host "   Se ejecutara la consulta via LDAP/DirectorySearcher fallback." -ForegroundColor DarkYellow
        $adModuleAvailable = $false
    } else {
        Import-Module ActiveDirectory -ErrorAction SilentlyContinue
    }

    # ── 2. Consulta de existencia previa en AD ────────────────────────────────
    Write-Host "[2/3] Verificando existencia previa de '$ComputerName' en AD..." -ForegroundColor Yellow

    $deviceExists = $false
    $existingDistinguishedName = ""

    if ($adModuleAvailable) {
        # Búsqueda mediante cmdlet oficial de Active Directory
        $adComputer = Get-ADComputer -Filter "Name -eq '$ComputerName'" -ErrorAction SilentlyContinue
        if ($adComputer) {
            $deviceExists = $true
            $existingDistinguishedName = $adComputer.DistinguishedName
        }
    }
    else {
        # Búsqueda fallback utilizando .NET DirectorySearcher (LDAP)
        $searcher = New-Object System.DirectoryServices.DirectorySearcher
        $searcher.Filter = "(&(objectCategory=computer)(name=$ComputerName))"
        $result = $searcher.FindOne()
        if ($result) {
            $deviceExists = $true
            $existingDistinguishedName = $result.Properties["distinguishedname"][0]
        }
    }

    if ($deviceExists) {
        $msg = "El dispositivo '$ComputerName' ya existe en Active Directory ($existingDistinguishedName)."
        Write-Host "   [EXISTE] $msg" -ForegroundColor Yellow
        
        $auditRecord.Status  = "AlreadyExists"
        $auditRecord.Details = $msg
        $auditRecord.Success = $true

        Export-AuditLog -Record $auditRecord -Path $LogPath
        Write-Host ""
        Write-Host "Proceso finalizado sin cambios (El equipo ya esta registrado)." -ForegroundColor Yellow
        exit 0
    }

    # ── 3. Registrar el nuevo equipo en Active Directory ──────────────────────
    Write-Host "[3/3] Registrando dispositivo '$ComputerName' en la OU: '$TargetOU'..." -ForegroundColor Yellow

    $descriptionText = "MDM Enrolled Device | ID: $DeviceId | Enrolado el: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"

    if ($adModuleAvailable) {
        New-ADComputer -Name $ComputerName `
                       -Path $TargetOU `
                       -Description $descriptionText `
                       -Enabled $true `
                       -ErrorAction Stop
    }
    else {
        # Creación mediante fallback ADSI
        $ouEntry = [ADSI]"LDAP://$TargetOU"
        $newComputer = $ouEntry.Create("Computer", "CN=$ComputerName")
        $newComputer.Put("sAMAccountName", "$ComputerName`$")
        $newComputer.Put("description", $descriptionText)
        $newComputer.SetInfo()
    }

    $successMsg = "Dispositivo '$ComputerName' registrado exitosamente con DeviceId '$DeviceId' en '$TargetOU'."
    Write-Host "   [EXITO] $successMsg" -ForegroundColor Green

    $auditRecord.Status  = "Created"
    $auditRecord.Details = $successMsg
    $auditRecord.Success = $true

    Export-AuditLog -Record $auditRecord -Path $LogPath

    Write-Host ""
    Write-Host "Enrolamiento de dispositivo completado con exito." -ForegroundColor Green
}
catch {
    $errorMsg = "Error durante el enrolamiento del dispositivo '$ComputerName': $($_.Exception.Message)"
    Write-Host "   [ERROR CRITICO] $errorMsg" -ForegroundColor Red

    $auditRecord.Status  = "Error"
    $auditRecord.Details = $errorMsg
    $auditRecord.Success = $false

    Export-AuditLog -Record $auditRecord -Path $LogPath

    exit 1
}
