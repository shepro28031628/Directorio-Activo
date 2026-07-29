import { c as defineEventHandler, i as getRequestHeader, j as setResponseHeader } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'socket.io';
import 'nitropack/dist/runtime/plugin';
import 'node:url';

const install_ps1 = defineEventHandler(async (event) => {
  const host = getRequestHeader(event, "host") || "localhost:3000";
  const protocol = "https" ;
  const backendUrl = `${protocol}://${host}`;
  const backendApi = `${backendUrl}/api/equipos`;
  const lines = [
    "# ============================================================",
    "# REN MDM Agent Installer v2.0",
    `# Backend: ${backendUrl}`,
    "# ============================================================",
    "",
    "function Enroll-Device {",
    "  param(",
    "    [Parameter(Mandatory=$true)][string]$Token,",
    '    [string]$Intervalo = "5"',
    "  )",
    "",
    '  $ErrorActionPreference = "Stop"',
    '  $AgentDir = "C:\\ProgramData\\RenConsultores\\Agent"',
    `  $NodeUrl  = "${backendUrl}/agent/node.exe"`,
    `  $AgentUrl = "${backendUrl}/agent/ren-agent.js"`,
    `  $Backend  = "${backendApi}"`,
    "",
    '  Write-Host ""',
    '  Write-Host "=====================================================" -ForegroundColor Cyan',
    '  Write-Host "   REN MDM Agent - Instalacion del Agente" -ForegroundColor Cyan',
    '  Write-Host "=====================================================" -ForegroundColor Cyan',
    '  Write-Host ""',
    "",
    "  # 1. Crear directorio del agente",
    '  Write-Host "[1/5] Creando directorio del agente..." -ForegroundColor Yellow',
    "  if (-not (Test-Path $AgentDir)) {",
    "    New-Item -ItemType Directory -Path $AgentDir -Force | Out-Null",
    "  }",
    '  Write-Host "      OK: $AgentDir" -ForegroundColor Green',
    "",
    "  # 2. Guardar el token",
    '  Write-Host "[2/5] Guardando token de seguridad..." -ForegroundColor Yellow',
    '  Set-Content -Path "$AgentDir\\token.txt" -Value $Token -Encoding UTF8',
    '  Write-Host "      OK: token.txt guardado" -ForegroundColor Green',
    "",
    "  # 3. Obtener node.exe",
    '  Write-Host "[3/5] Verificando runtime Node.js..." -ForegroundColor Yellow',
    '  if (-not (Test-Path "$AgentDir\\node.exe")) {',
    "    $nodeSys = (Get-Command node -ErrorAction SilentlyContinue)",
    "    if ($nodeSys) {",
    '      Copy-Item $nodeSys.Source "$AgentDir\\node.exe" -Force',
    '      Write-Host "      OK: node.exe copiado del sistema" -ForegroundColor Green',
    "    } else {",
    '      Write-Host "      Descargando Node.js v20 LTS..." -ForegroundColor Yellow',
    '      $msi = "$env:TEMP\\node-v20.msi"',
    '      Invoke-WebRequest -Uri "https://nodejs.org/dist/v20.19.0/node-v20.19.0-x64.msi" -OutFile $msi -UseBasicParsing',
    '      Start-Process msiexec.exe -ArgumentList "/i $msi /quiet /norestart" -Wait',
    '      Copy-Item "C:\\Program Files\\nodejs\\node.exe" "$AgentDir\\node.exe" -Force',
    '      Write-Host "      OK: Node.js instalado" -ForegroundColor Green',
    "    }",
    "  } else {",
    '    Write-Host "      OK: node.exe ya existe" -ForegroundColor Green',
    "  }",
    "",
    "  # 4. Descargar el agente y configurar URL del backend",
    '  Write-Host "[4/5] Descargando agente REN..." -ForegroundColor Yellow',
    '  Invoke-WebRequest -Uri $AgentUrl -OutFile "$AgentDir\\ren-agent.js" -UseBasicParsing',
    "  # Reemplazar placeholder con la URL real del backend",
    `  (Get-Content "$AgentDir\\ren-agent.js" -Raw) -replace 'http://<IP_DEL_SERVIDOR>:3000/api/equipos', $Backend | Set-Content "$AgentDir\\ren-agent.js" -Encoding UTF8`,
    '  Write-Host "      OK: ren-agent.js configurado con backend $Backend" -ForegroundColor Green',
    "",
    "  # 5. Crear tarea programada de inicio automatico",
    '  Write-Host "[5/5] Registrando tarea en el Programador de Tareas..." -ForegroundColor Yellow',
    '  $taskName = "RenMDMAgent"',
    "  Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue",
    '  $action    = New-ScheduledTaskAction -Execute "$AgentDir\\node.exe" -Argument "$AgentDir\\ren-agent.js" -WorkingDirectory $AgentDir',
    "  $trigger   = New-ScheduledTaskTrigger -AtStartup",
    "  $settings  = New-ScheduledTaskSettingsSet -ExecutionTimeLimit 0 -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1) -StartWhenAvailable",
    '  $principal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount -RunLevel Highest',
    '  Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Principal $principal -Description "REN MDM Agent" | Out-Null',
    "  Start-ScheduledTask -TaskName $taskName",
    '  Write-Host "      OK: Tarea RenMDMAgent iniciada" -ForegroundColor Green',
    "",
    '  Write-Host ""',
    '  Write-Host "=====================================================" -ForegroundColor Green',
    '  Write-Host "   INSTALACION COMPLETADA EXITOSAMENTE" -ForegroundColor Green',
    '  Write-Host "=====================================================" -ForegroundColor Green',
    '  Write-Host "   Equipo : $env:COMPUTERNAME" -ForegroundColor White',
    `  Write-Host "   Portal : ${backendUrl}/enrolamiento" -ForegroundColor Cyan`,
    '  Write-Host "=====================================================" -ForegroundColor Green',
    '  Write-Host ""',
    "}",
    "",
    'Write-Host "Script REN MDM cargado. Uso:" -ForegroundColor Cyan',
    `Write-Host "  Enroll-Device -Token 'TU_TOKEN'" -ForegroundColor Yellow`
  ];
  const script = lines.join("\r\n");
  setResponseHeader(event, "Content-Type", "text/plain; charset=utf-8");
  setResponseHeader(event, "Content-Disposition", 'inline; filename="install.ps1"');
  return script;
});

export { install_ps1 as default };
//# sourceMappingURL=install.ps1.mjs.map
