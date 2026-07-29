# ==============================================================
# register-equipo.ps1 - REN MDM: Registrar y enrolar un equipo
# ==============================================================
# USO (como Administrador):
#   .\register-equipo.ps1 -Backend "http://SERVIDOR:3000" -Colaborador 5
#
# Parámetros:
#   -Backend      URL completa del servidor (ej: http://10.0.1.15:3000)
#   -Colaborador  ID del colaborador al que se asignará el equipo (opcional)
#   -TipoActivo   Portatil | Desktop | Celular (default: Portatil)
# ==============================================================

param(
    [Parameter(Mandatory=$true)]
    [string]$Backend,

    [int]$Colaborador = 0,
    [string]$TipoActivo = "Portatil"
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "   REN MDM - Registro e Instalacion del Agente" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

# ── Recolectar información del equipo ──────────────────────────

Write-Host "[1/4] Recolectando informacion del equipo..." -ForegroundColor Yellow

$hostname    = $env:COMPUTERNAME
$serial      = (Get-WmiObject Win32_BIOS).SerialNumber
$uuid        = (Get-WmiObject Win32_ComputerSystemProduct).UUID
$procesador  = (Get-WmiObject Win32_Processor | Select-Object -First 1).Name
$ramBytes    = (Get-WmiObject Win32_ComputerSystem).TotalPhysicalMemory
$ramGb       = [math]::Round($ramBytes / 1GB, 0)
$so          = (Get-WmiObject Win32_OperatingSystem).Caption
$osVersion   = (Get-WmiObject Win32_OperatingSystem).Version

# Disco C:
$disco = Get-PSDrive -PSProvider FileSystem | Where-Object { $_.Root -eq "C:\" }
$discoTotalGb = [math]::Round(($disco.Used + $disco.Free) / 1GB, 0)

# Red
$netAdapter = Get-NetAdapter | Where-Object { $_.Status -eq "Up" -and $_.InterfaceDescription -notmatch "Loopback" } | Select-Object -First 1
$mac        = $netAdapter.MacAddress -replace "-", ":"
$ip         = (Get-NetIPAddress -InterfaceIndex $netAdapter.InterfaceIndex -AddressFamily IPv4 -ErrorAction SilentlyContinue).IPAddress | Select-Object -First 1

Write-Host "   Hostname  : $hostname"      -ForegroundColor White
Write-Host "   Serial    : $serial"        -ForegroundColor White
Write-Host "   UUID      : $uuid"          -ForegroundColor White
Write-Host "   SO        : $so $osVersion" -ForegroundColor White
Write-Host "   CPU       : $procesador"    -ForegroundColor White
Write-Host "   RAM       : ${ramGb}GB"     -ForegroundColor White
Write-Host "   Disco C:  : ${discoTotalGb}GB" -ForegroundColor White
Write-Host "   IP Local  : $ip"            -ForegroundColor White
Write-Host "   MAC       : $mac"           -ForegroundColor White
Write-Host ""

# ── Registrar equipo en el backend ────────────────────────────

Write-Host "[2/4] Registrando equipo en el portal MDM ($Backend)..." -ForegroundColor Yellow

$body = @{
    hostname       = $hostname
    serial         = $serial
    mac_address    = $mac
    ip_registro    = $ip
    so             = "$so $osVersion"
    ram            = "${ramGb}GB"
    disco          = "${discoTotalGb}GB"
    procesador     = $procesador
    tipo_activo    = $TipoActivo
} 
if ($Colaborador -gt 0) {
    $body["colaborador_id"] = $Colaborador
}

$bodyJson = $body | ConvertTo-Json -Depth 3

try {
    $response = Invoke-RestMethod -Uri "$Backend/api/equipos/create" `
        -Method POST `
        -ContentType "application/json" `
        -Body $bodyJson
    
    $token = $response.token_seguridad
    Write-Host "   OK: Equipo registrado con ID $($response.id)" -ForegroundColor Green
    Write-Host "   Token: $token"                                  -ForegroundColor Green
} catch {
    # Si el equipo ya existe, intentar obtener el token existente
    Write-Host "   El equipo ya existe. Intentando recuperar token..." -ForegroundColor Yellow
    try {
        $allEquipos = Invoke-RestMethod -Uri "$Backend/api/equipos" -Method GET
        $equipo = $allEquipos | Where-Object { $_.hostname -eq $hostname } | Select-Object -First 1
        if ($equipo) {
            $token = $equipo.token_seguridad
            Write-Host "   OK: Token recuperado del equipo existente" -ForegroundColor Green
        } else {
            Write-Host "   ERROR: No se pudo obtener el token. Registra el equipo manualmente en el portal." -ForegroundColor Red
            exit 1
        }
    } catch {
        Write-Host "   ERROR: $_" -ForegroundColor Red
        exit 1
    }
}

# ── Guardar token localmente ───────────────────────────────────

Write-Host "[3/4] Guardando token en el equipo..." -ForegroundColor Yellow
$agentDir = "C:\ProgramData\RenConsultores\Agent"
if (-not (Test-Path $agentDir)) {
    New-Item -ItemType Directory -Path $agentDir -Force | Out-Null
}
Set-Content -Path "$agentDir\token.txt" -Value $token -Encoding UTF8
Write-Host "   OK: Token guardado en $agentDir\token.txt" -ForegroundColor Green

# ── Instalar el agente ─────────────────────────────────────────

Write-Host "[4/4] Instalando el agente MDM..." -ForegroundColor Yellow
Invoke-Expression ((Invoke-WebRequest -Uri "$Backend/agent/install.ps1" -UseBasicParsing).Content)
Enroll-Device -Token $token

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Green
Write-Host "   REGISTRO E INSTALACION COMPLETADOS" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Green
Write-Host "   Equipo '$hostname' ya aparece en el portal:" -ForegroundColor White
Write-Host "   $Backend/equipos" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Green
Write-Host ""
