# ---------------------------------------------------------------
# schedule-collector.ps1
# Crea tarea programada para ejecutar el colector de informacion
# de equipos corporativos.
# Ejecutar como Administrador.
# ---------------------------------------------------------------

param(
    [int]$DiaIntervalo = 7,                          # cada cuantos dias se ejecuta
    [string]$NodePath = "C:\ProgramData\RenConsultores\Agent\node.exe",
    [string]$ScriptPath = "C:\ProgramData\RenConsultores\Agent\collect-info.js"
)

$taskName    = "RenCollector"
$taskDisplay = "RenConsultores - Colector de Informacion de Equipo"

# Eliminar tarea previa si existe
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

# Accion: ejecutar node con el script
$action = New-ScheduledTaskAction `
    -Execute $NodePath `
    -Argument "`"$ScriptPath`""

# Disparador: diario, cada N dias, iniciando hoy a las 08:00 AM
$trigger = New-ScheduledTaskTrigger `
    -Daily `
    -DaysInterval $DiaIntervalo `
    -At "08:00"

# Configuracion: correr como SYSTEM con maximos privilegios
$principal = New-ScheduledTaskPrincipal `
    -UserId "SYSTEM" `
    -LogonType ServiceAccount `
    -RunLevel Highest

# Configuracion adicional de la tarea
$settings = New-ScheduledTaskSettingsSet `
    -StartWhenAvailable `
    -RunOnlyIfNetworkAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 30)

# Registrar tarea
Register-ScheduledTask `
    -TaskName $taskName `
    -Description $taskDisplay `
    -Action $action `
    -Trigger $trigger `
    -Principal $principal `
    -Settings $settings `
    -Force | Out-Null

Write-Host "✅  Tarea '$taskName' registrada correctamente." -ForegroundColor Green
Write-Host "    → Se ejecutara cada $DiaIntervalo dia(s) a las 08:00 AM como SYSTEM." -ForegroundColor Cyan
Write-Host "    → Node: $NodePath" -ForegroundColor Gray
Write-Host "    → Script: $ScriptPath" -ForegroundColor Gray
