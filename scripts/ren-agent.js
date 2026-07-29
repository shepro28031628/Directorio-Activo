// ren-agent.js  (Node.js) - REN MDM Agent v2.0
// ============================================================
// Agente corporativo: captura telemetría completa y la envía
// al backend cada 5 minutos. Ejecuta como tarea de SYSTEM.
// Incluye: Bloqueo/Desbloqueo remoto de pantalla con UI WPF.
// ============================================================

const https   = require('https');
const http    = require('http');
const { exec, spawn, execSync } = require('child_process');
const os      = require('os');
const fs      = require('fs');
const path    = require('path');

// ---------------------------------------------------------------
// CONFIGURATION – La URL del backend se inyecta al instalar
const API_BASE   = 'http://<IP_DEL_SERVIDOR>:3000/api/equipos';
const INTERVAL_MS = 300_000; // cada 5 minutos

// Directorio del agente
const AGENT_DIR = `${process.env.ProgramData || 'C:\\ProgramData'}\\RenConsultores\\Agent`;

// ---------------------------------------------------------------
// Cargar token de seguridad (guardado por install.ps1)
const TOKEN_PATH = path.join(AGENT_DIR, 'token.txt');

function getToken() {
  if (fs.existsSync(TOKEN_PATH)) {
    return fs.readFileSync(TOKEN_PATH, 'utf8').trim();
  }
  console.error('❌  Token no encontrado. Ejecuta install.ps1 primero.');
  process.exit(1);
}

const token = getToken();

// ---------------------------------------------------------------
// LOCK SCREEN MANAGEMENT
// Archivo señal para controlar el estado de bloqueo
const LOCK_FLAG  = path.join(AGENT_DIR, 'lock.flag');
const LOCK_SCRIPT = path.join(AGENT_DIR, 'ren-lock.ps1');
let lockProcess = null; // Referencia al proceso de la pantalla de bloqueo

function isLocked() {
  return fs.existsSync(LOCK_FLAG);
}

function activateLock(mensaje) {
  if (isLocked() && lockProcess && !lockProcess.killed) {
    console.log('🔒 Pantalla ya bloqueada, ignorando comando duplicado.');
    return;
  }

  console.log('🔒 BLOQUEANDO PANTALLA...');
  console.log(`   Motivo: ${mensaje || 'Orden remota de TI'}`);

  // Crear archivo señal de bloqueo
  fs.writeFileSync(LOCK_FLAG, JSON.stringify({
    bloqueado_en: new Date().toISOString(),
    motivo: mensaje || 'Bloqueo remoto por TI'
  }), 'utf8');

  // Verificar que existe el script de bloqueo
  if (!fs.existsSync(LOCK_SCRIPT)) {
    console.error('❌ No se encontró ren-lock.ps1. Se usará bloqueo nativo de Windows.');
    exec('rundll32.exe user32.dll,LockWorkStation');
    return;
  }

  // Lanzar la pantalla de bloqueo WPF en modo interactivo
  // Usamos -WindowStyle Hidden para el propio PowerShell pero la ventana WPF es Maximized
  lockProcess = spawn('powershell.exe', [
    '-NoProfile',
    '-ExecutionPolicy', 'Bypass',
    '-File', LOCK_SCRIPT
  ], {
    detached: false,
    stdio: 'ignore',
    windowsHide: false
  });

  lockProcess.on('exit', (code) => {
    console.log(`🔒 Proceso de bloqueo terminó (code: ${code})`);
    lockProcess = null;
    // Si aún existe el flag, relanzar (previene que el usuario mate el proceso)
    if (isLocked()) {
      console.log('🔒 Re-lanzando pantalla de bloqueo (flag aún activo)...');
      setTimeout(() => activateLock(mensaje), 1000);
    }
  });

  lockProcess.on('error', (err) => {
    console.error('❌ Error al lanzar pantalla de bloqueo:', err.message);
    // Fallback: bloqueo nativo de Windows
    exec('rundll32.exe user32.dll,LockWorkStation');
  });

  console.log('🔒 Pantalla de bloqueo WPF activada.');
}

function deactivateLock() {
  if (!isLocked()) {
    console.log('🔓 El equipo ya está desbloqueado.');
    return;
  }

  console.log('🔓 DESBLOQUEANDO PANTALLA...');

  // Eliminar archivo señal
  try {
    fs.unlinkSync(LOCK_FLAG);
  } catch (_) {}

  // Terminar el proceso de la pantalla de bloqueo
  if (lockProcess && !lockProcess.killed) {
    try {
      // Matar el proceso y sus hijos (PowerShell WPF)
      exec(`taskkill /F /PID ${lockProcess.pid} /T`, (err) => {
        if (err) console.log('   (proceso ya terminado)');
      });
    } catch (_) {}
    lockProcess = null;
  }

  // Seguridad: matar cualquier proceso residual del lock screen
  exec('taskkill /F /FI "WINDOWTITLE eq REN-MDM-LOCK" /T', () => {});

  console.log('🔓 Pantalla desbloqueada exitosamente.');
}

// ---------------------------------------------------------------
// Al iniciar, verificar si hay un bloqueo pendiente
function checkPendingLock() {
  if (isLocked()) {
    console.log('🔒 Se detectó bloqueo pendiente. Re-activando pantalla...');
    const data = JSON.parse(fs.readFileSync(LOCK_FLAG, 'utf8'));
    activateLock(data.motivo || 'Bloqueo persistente');
  }
}

// ---------------------------------------------------------------
// Helper: ejecutar PowerShell y devolver stdout limpio
function ps(command) {
  return new Promise((resolve) => {
    exec(`powershell -NoProfile -NonInteractive -Command "${command}"`, (err, out) => {
      resolve(err ? '' : out.trim());
    });
  });
}

// ---------------------------------------------------------------
// 1. INFORMACIÓN DE HARDWARE: Serial y UUID
async function getHardwareInfo() {
  const [serialRaw, uuidRaw, cpuRaw, cpuCores] = await Promise.all([
    ps('(Get-WmiObject Win32_BIOS).SerialNumber'),
    ps('(Get-WmiObject Win32_ComputerSystemProduct).UUID'),
    ps('(Get-WmiObject Win32_Processor | Select-Object -First 1).Name'),
    ps('(Get-WmiObject Win32_Processor | Select-Object -First 1).NumberOfCores'),
  ]);

  return {
    serial:    serialRaw || 'N/A',
    uuid:      uuidRaw   || 'N/A',
    procesador: cpuRaw   || os.cpus()[0]?.model || 'N/A',
    cpu_nucleos: parseInt(cpuCores) || os.cpus().length,
  };
}

// ---------------------------------------------------------------
// 2. SISTEMA OPERATIVO: Nombre completo y versión
async function getOsInfo() {
  const [osName, osVersion, osBuild] = await Promise.all([
    ps('(Get-WmiObject Win32_OperatingSystem).Caption'),
    ps('(Get-WmiObject Win32_OperatingSystem).Version'),
    ps('(Get-WmiObject Win32_OperatingSystem).BuildNumber'),
  ]);

  return {
    so:         osName    || `${os.platform()} ${os.release()}`,
    os_version: osVersion || os.release(),
    os_build:   osBuild   || '',
    windows_user: os.userInfo().username,
  };
}

// ---------------------------------------------------------------
// 3. RECURSOS: CPU (%), RAM (total/uso), Disco (C:)
async function getResources() {
  // CPU load (promedio últimas 2 muestras de WMI)
  const cpuPctRaw = await ps(
    '(Get-WmiObject Win32_Processor | Measure-Object -Property LoadPercentage -Average).Average'
  );
  const cpu_carga = parseInt(cpuPctRaw) || Math.round(os.loadavg()[0] * 10);

  // RAM
  const totalMem   = os.totalmem();
  const freeMem    = os.freemem();
  const ram_total_gb = parseFloat((totalMem / 1024 ** 3).toFixed(1));
  const ram_uso    = Math.round(((totalMem - freeMem) / totalMem) * 100);

  // Disco C:
  const discoRaw = await ps(
    'Get-PSDrive -PSProvider FileSystem | Where-Object {$_.Root -eq "C:\\\\"} | Select-Object Used,Free | ConvertTo-Json'
  );
  let disco_uso_pct = 0, disco_usado_gb = 0, disco_total_gb = 0;
  try {
    const d = JSON.parse(discoRaw);
    const used = parseInt(d.Used);
    const free = parseInt(d.Free);
    disco_total_gb  = Math.round((used + free) / 1024 ** 3);
    disco_usado_gb  = Math.round(used / 1024 ** 3);
    disco_uso_pct   = Math.round((used / (used + free)) * 100);
  } catch (_) {}

  return {
    cpu_carga,
    ram_total_gb,
    ram_uso,
    disco_uso_pct,
    disco_usado_gb,
    disco: `${disco_total_gb}GB`,
  };
}

// ---------------------------------------------------------------
// 4. RED: IP local, MAC, adaptadores
function getNetworkInfo() {
  const interfaces = os.networkInterfaces();
  const allIfaces  = Object.values(interfaces).flat().filter(Boolean);

  const primary = allIfaces.find(i => !i.internal && i.family === 'IPv4');
  const ip_local   = primary?.address || '';
  const mac_address = primary?.mac    || '';

  // Todos los adaptadores activos (sin loopback)
  const adaptadores = Object.entries(interfaces)
    .map(([name, addrs]) => ({
      nombre: name,
      ip: addrs?.find(a => a.family === 'IPv4' && !a.internal)?.address || null,
      mac: addrs?.find(a => !a.internal && a.mac)?.mac || null,
    }))
    .filter(a => a.ip || a.mac);

  return { ip_local, mac_address, adaptadores };
}

// ---------------------------------------------------------------
// 5. IP PÚBLICA, ISP y detección de VPN
function getPublicInfo() {
  return new Promise((resolve) => {
    const req = https.get('https://ipinfo.io/json', { timeout: 8000 }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const info     = JSON.parse(data);
          const ip_publica = info.ip  || '';
          const isp        = info.org || '';
          const ciudad     = info.city   || '';
          const pais       = info.country || '';
          // Detección básica de VPN/proxy por nombre del ISP
          const vpn = /vpn|proxy|cloudflare|tor|mullvad|expressvpn|nordvpn/i.test(isp);
          resolve({ ip_publica, isp, ciudad, pais, vpn });
        } catch (_) {
          resolve({ ip_publica: '', isp: '', ciudad: '', pais: '', vpn: false });
        }
      });
    });
    req.on('error',   () => resolve({ ip_publica: '', isp: '', ciudad: '', pais: '', vpn: false }));
    req.on('timeout', () => { req.destroy(); resolve({ ip_publica: '', isp: '', ciudad: '', pais: '', vpn: false }); });
  });
}

// ---------------------------------------------------------------
// Procesar comandos remotos recibidos del backend
function processCommand(resp) {
  try {
    if (typeof resp === 'string') resp = JSON.parse(resp);
  } catch (_) { return; }

  const cmd = resp.comando;
  if (!cmd || cmd === 'NINGUNO') return;

  console.log(`⚙️  Comando remoto recibido: ${cmd}`);

  switch (cmd) {
    case 'BLOQUEAR':
      activateLock(resp.mensaje || 'Bloqueo ordenado por TI');
      break;
    case 'DESBLOQUEAR':
      deactivateLock();
      break;
    case 'REINICIAR':
      exec('shutdown /r /t 30 /c "Reinicio remoto MDM"');
      break;
    case 'APAGAR':
      exec('shutdown /s /t 30 /c "Apagado remoto MDM"');
      break;
    default:
      console.log(`   Comando no reconocido: ${cmd}`);
  }
}

// ---------------------------------------------------------------
// Enviar ping al backend con toda la telemetría
async function sendPing() {
  console.log(`\n[${new Date().toLocaleTimeString()}] Recopilando telemetría...`);

  const [hw, osInfo, resources, publicInfo] = await Promise.all([
    getHardwareInfo(),
    getOsInfo(),
    getResources(),
    getPublicInfo(),
  ]);
  const net = getNetworkInfo();

  const payload = {
    token_seguridad: token,
    // ── Identidad ────────────────────────
    hostname:      os.hostname(),
    serial:        hw.serial,
    uuid:          hw.uuid,
    windows_user:  osInfo.windows_user,
    // ── Sistema Operativo ────────────────
    so:            osInfo.so,
    os_version:    osInfo.os_version,
    os_build:      osInfo.os_build,
    // ── CPU ──────────────────────────────
    procesador:    hw.procesador,
    cpu_nucleos:   hw.cpu_nucleos,
    cpu_carga:     resources.cpu_carga,
    // ── RAM ──────────────────────────────
    ram:           `${resources.ram_total_gb}GB`,
    ram_uso:       resources.ram_uso,
    // ── Disco ────────────────────────────
    disco:         resources.disco,
    disco_uso_pct: resources.disco_uso_pct,
    disco_usado_gb:resources.disco_usado_gb,
    // ── Red ──────────────────────────────
    ip_registro:   net.ip_local,
    ip_local:      net.ip_local,
    mac_address:   net.mac_address,
    adaptadores:   net.adaptadores,
    // ── IP Pública / VPN ─────────────────
    ip_publica:    publicInfo.ip_publica,
    isp:           publicInfo.isp,
    ciudad:        publicInfo.ciudad,
    pais:          publicInfo.pais,
    vpn:           publicInfo.vpn,
  };

  const data = JSON.stringify(payload);
  const url  = `${API_BASE}/ping`;
  const lib  = url.startsWith('https') ? https : http;

  const req = lib.request(url, {
    method: 'POST',
    headers: {
      'Content-Type':   'application/json',
      'Content-Length': Buffer.byteLength(data),
    },
  }, res => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      if (res.statusCode === 200 || res.statusCode === 201) {
        console.log(`✅ Ping OK (${res.statusCode}) | CPU: ${payload.cpu_carga}% | RAM: ${payload.ram_uso}% | IP: ${payload.ip_local}`);
        processCommand(body);
      } else {
        console.warn(`⚠️  Respuesta inesperada del servidor: ${res.statusCode}`);
      }
    });
  });

  req.on('error', err => console.error('❌ Error al enviar ping:', err.message));
  req.write(data);
  req.end();
}

// ---------------------------------------------------------------
// Bucle principal
console.log('');
console.log('╔══════════════════════════════════════════════════╗');
console.log('║    🚀 REN MDM Agent v2.0 · Lock Screen Ready   ║');
console.log('╠══════════════════════════════════════════════════╣');
console.log(`║  Backend  : ${API_BASE.substring(0, 38).padEnd(38)}║`);
console.log(`║  Hostname : ${os.hostname().padEnd(38)}║`);
console.log(`║  Usuario  : ${os.userInfo().username.padEnd(38)}║`);
console.log(`║  Intervalo: ${(INTERVAL_MS / 1000 + 's').padEnd(38)}║`);
console.log(`║  Lock UI  : ${(fs.existsSync(LOCK_SCRIPT) ? '✅ ren-lock.ps1' : '⚠️  No encontrado').padEnd(38)}║`);
console.log('╚══════════════════════════════════════════════════╝');
console.log('');

// Verificar bloqueo pendiente al iniciar
checkPendingLock();

// Primer ping inmediato
sendPing();
setInterval(sendPing, INTERVAL_MS);
