// collect-info.js – Node.js + PowerShell collector
// ------------------------------------------------
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const http = require('http');
const https = require('https');

// Configuración
// El hostname lo definiremos aquí o mediante variables de entorno
const BACKEND_HOST = process.env.COLLECTOR_BACKEND || 'localhost'; // Ajusta al hostname real si es necesario
const BACKEND_URL = `http://${BACKEND_HOST}:3000/api/equipos/collect`;

const TOKEN_FILE = path.join(
  process.env.PROGRAMDATA || 'C:\\ProgramData',
  'RenConsultores',
  'Agent',
  'token.txt'
);

if (!fs.existsSync(TOKEN_FILE)) {
  console.error(`❌ Token no encontrado en ${TOKEN_FILE}. Registre el equipo primero.`);
  process.exit(1);
}

const TOKEN = fs.readFileSync(TOKEN_FILE, 'utf8').trim();

// Helper para ejecutar PowerShell y devolver stdout
function pwsh(cmd) {
  try {
    return execSync(`powershell -NoProfile -Command "${cmd}"`, {
      encoding: 'utf8',
      shell: 'powershell.exe'
    }).trim();
  } catch (err) {
    console.error(`Error ejecutando comando PS: ${cmd}. Detalle: ${err.message}`);
    return '';
  }
}

// 1️⃣ Recolectar datos
const nombrePc = os.hostname();

// Batería (solo laptops)
let bateria = null;
try {
  const bat = pwsh("(Get-WmiObject -Class Win32_Battery).EstimatedChargeRemaining");
  if (bat) {
    bateria = parseInt(bat, 10);
  }
} catch (_) {}

// RAM (GB)
const ramGb = Math.round(os.totalmem() / (1024 ** 3) * 10) / 10;

// Sistema operativo
let so = '';
try {
  so = pwsh("(Get-CimInstance Win32_OperatingSystem).Caption");
} catch (_) {
  so = os.type() + ' ' + os.release();
}

// Actualizaciones pendientes (KB IDs)
let actualizaciones = [];
try {
  const pending = pwsh(
    "Get-WmiObject -Class Win32_QuickFixEngineering | Where-Object {$_.InstalledOn -eq $null} | Select-Object -ExpandProperty HotFixID"
  );
  actualizaciones = pending ? pending.split(/\r?\n/).filter(Boolean) : [];
} catch (_) {}

// Aplicaciones instaladas (registro de Windows)
let appsInstaladas = [];
try {
  const raw = pwsh(
    "Get-ItemProperty 'HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*' | " +
    "Select-Object DisplayName,DisplayVersion,Publisher | Where-Object {$_.DisplayName} | " +
    "ConvertTo-Json -Depth 2"
  );
  if (raw) {
    appsInstaladas = JSON.parse(raw);
  }
} catch (_) {}

// Uso de disco C:
let discUsoPct = null;
try {
  const out = pwsh(
    "(Get-PSDrive -PSProvider 'FileSystem' | Where-Object {$_.Name -eq 'C'}).Used / (Get-PSDrive -PSProvider 'FileSystem' | Where-Object {$_.Name -eq 'C'}).MaximumSize * 100"
  );
  if (out) {
    discUsoPct = parseFloat(parseFloat(out).toFixed(2));
  }
} catch (_) {}

// AD info
let policiesApplied = null;
let adGroups = null;
let organizationalUnit = null;
try {
  const data = pwsh(`
    Import-Module ActiveDirectory -ErrorAction SilentlyContinue;
    $c = Get-ADComputer -Identity $env:COMPUTERNAME -Properties MemberOf,DistinguishedName -ErrorAction SilentlyContinue;
    if ($c) {
      $groups = $c.MemberOf | ForEach-Object { ($_ -split ',')[0] -replace '^CN=' };
      $ou = $c.DistinguishedName -replace '^.+?,(OU=.*)$','$1';
      $gpoCount = 0;
      try {
        $gp = (Get-GPResultantSetOfPolicy -ReportType Html -Path "$env:TEMP\\gpresult.html" -ErrorAction SilentlyContinue);
        $gpoCount = (Select-String -Path "$env:TEMP\\gpresult.html" -Pattern 'Class=\"GPResult\"' -AllMatches -ErrorAction SilentlyContinue).Matches.Count;
      } catch {}
      @{ groups=$groups; ou=$ou; gpoCount=$gpoCount } | ConvertTo-Json -Depth 2
    }
  `);
  if (data) {
    const parsed = JSON.parse(data);
    adGroups = parsed.groups;
    organizationalUnit = parsed.ou;
    policiesApplied = { gpoCount: parsed.gpoCount };
  }
} catch (_) {}

// Metadatos extra (CPU, MAC)
let cpu = '';
let mac = '';
try {
  cpu = pwsh("(Get-CimInstance Win32_Processor).Name");
  mac = pwsh("(Get-NetAdapter | Where-Object {$_.Status -eq 'Up'} | Select-Object -First 1 -ExpandProperty MacAddress)");
} catch (_) {}

const metadata = {
  cpu: cpu || os.cpus()[0].model,
  mac: mac || ''
};

// 2️⃣ Payload
const payload = {
  token_seguridad: TOKEN,
  nombrePc,
  bateriaPorcentaje: bateria,
  ramGb,
  sistemaOperativo: so,
  actualizaciones,
  appsInstaladas,
  discUsoPct,
  policiesApplied,
  adGroups,
  organizationalUnit,
  metadata,
};

// 3️⃣ Envío HTTP POST
function post(url, data) {
  const dataStr = JSON.stringify(data);
  const lib = url.startsWith('https') ? https : http;
  const parsed = new URL(url);
  const options = {
    hostname: parsed.hostname,
    port: parsed.port,
    path: parsed.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(dataStr),
    },
  };
  const req = lib.request(options, (res) => {
    let body = '';
    res.on('data', (c) => (body += c));
    res.on('end', () => {
      console.log(`✅ Envío completado (status ${res.statusCode})`);
      console.log(body);
    });
  });
  req.on('error', (e) => console.error(`❌ Error: ${e.message}`));
  req.write(dataStr);
  req.end();
}

console.log(`📡 Enviando información a ${BACKEND_URL}...`);
post(BACKEND_URL, payload);
