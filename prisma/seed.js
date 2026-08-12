import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Limpiando base de datos REN...')
  await prisma.auditoria.deleteMany()
  await prisma.usuarioM365.deleteMany()
  await prisma.usuarioGoogle.deleteMany()
  await prisma.acceso.deleteMany()
  await prisma.aplicacion.deleteMany()
  await prisma.programaInstalado.deleteMany()
  await prisma.equipo.deleteMany()
  await prisma.colaborador.deleteMany()

  console.log('Creando colaboradores...')
  const col1 = await prisma.colaborador.create({
    data: {
      nombre: 'Juan Pérez',
      correo: 'jperez@renconsultores.com.co',
      jira_id: 'JIRA-COL-01',
      area: 'Tecnología',
      proyecto: 'Infraestructura',
      estado: 'Activo'
    }
  })

  const col2 = await prisma.colaborador.create({
    data: {
      nombre: 'Ana Gómez',
      correo: 'agomez@renconsultores.com.co',
      jira_id: 'JIRA-COL-02',
      area: 'Finanzas',
      proyecto: 'Operaciones',
      estado: 'Activo'
    }
  })

  const col3 = await prisma.colaborador.create({
    data: {
      nombre: 'Carlos Ruiz',
      correo: 'cruiz@renconsultores.com.co',
      jira_id: 'JIRA-COL-03',
      area: 'Desarrollo',
      proyecto: 'RENOVA',
      estado: 'Activo'
    }
  })

  const col4 = await prisma.colaborador.create({
    data: {
      nombre: 'Diana Beltrán',
      correo: 'dbeltran@renconsultores.com.co',
      jira_id: 'JIRA-COL-04',
      area: 'Marketing',
      proyecto: 'Ventas',
      estado: 'Vacaciones'
    }
  })

  const col5 = await prisma.colaborador.create({
    data: {
      nombre: 'Andrés Cabrera',
      correo: 'acabrera@renconsultores.com.co',
      jira_id: 'JIRA-COL-05',
      area: 'Soporte',
      proyecto: 'Mesa Ayuda',
      estado: 'Suspendido'
    }
  })

  console.log('Creando equipos y activos...')
  const eq1 = await prisma.equipo.create({
    data: {
      hostname: 'LAPTOP-TECNOLOGIA',
      jira_id: 'JIRA-EQ-01',
      mac_address: 'AA:BB:CC:DD:EE:01',
      ip_registro: '192.168.1.15',
      marca_modelo: 'Lenovo ThinkPad T14',
      estado: 'Asignado',
      token_seguridad: 'token-laptop-tec',
      tipo_activo: 'Portatil',
      so: 'Windows 11 Enterprise',
      ram: '16 GB',
      disco: '512 GB SSD',
      procesador: 'Intel Core i7-1185G7 @ 3.00GHz',
      serial: 'L3N-TRP5678',
      colaborador_id: col1.id,
      ultimo_ping: new Date()
    }
  })

  const eq2 = await prisma.equipo.create({
    data: {
      hostname: 'PC-OPERACIONES',
      jira_id: 'JIRA-EQ-02',
      mac_address: 'AA:BB:CC:DD:EE:02',
      ip_registro: '192.168.1.22',
      marca_modelo: 'HP ProDesk 400',
      estado: 'Asignado',
      token_seguridad: 'token-pc-ops',
      tipo_activo: 'Computadores escritorio',
      so: 'Windows 10 Pro',
      ram: '8 GB',
      disco: '256 GB SSD',
      procesador: 'Intel Core i5-10400 @ 2.90GHz',
      serial: 'MXL-998811',
      colaborador_id: col2.id,
      ultimo_ping: new Date()
    }
  })

  const eq3 = await prisma.equipo.create({
    data: {
      hostname: 'WORKSTATION-DEV',
      jira_id: 'JIRA-EQ-03',
      mac_address: 'AA:BB:CC:DD:EE:03',
      ip_registro: '192.168.1.34',
      marca_modelo: 'Dell Precision 3650',
      estado: 'Asignado',
      token_seguridad: 'token-ws-dev',
      tipo_activo: 'Portatil',
      so: 'Windows 11 Pro',
      ram: '32 GB',
      disco: '1 TB NVMe',
      procesador: 'AMD Ryzen 9 5900X',
      serial: 'DEL-DEV-0012',
      colaborador_id: col3.id,
      ultimo_ping: new Date()
    }
  })

  console.log('Auditorías de software de equipos (GLPI)...')
  await prisma.programaInstalado.createMany({
    data: [
      { equipo_id: eq1.id, nombre: 'AnyDesk', version: '7.1.13' },
      { equipo_id: eq1.id, nombre: 'Google Chrome', version: '120.0.6099' },
      { equipo_id: eq1.id, nombre: 'Slack', version: '4.35.0' },
      { equipo_id: eq1.id, nombre: 'Visual Studio Code', version: '1.85.1' },
      { equipo_id: eq2.id, nombre: 'Microsoft Office', version: '16.0.14' },
      { equipo_id: eq2.id, nombre: 'Google Chrome', version: '120.0.6099' },
      { equipo_id: eq2.id, nombre: 'AnyDesk', version: '7.0.4' },
      { equipo_id: eq3.id, nombre: 'Docker Desktop', version: '4.25.0' },
      { equipo_id: eq3.id, nombre: 'Google Chrome', version: '120.0.6099' },
      { equipo_id: eq3.id, nombre: 'Slack', version: '4.35.0' },
      { equipo_id: eq3.id, nombre: 'AnyDesk', version: '7.1.13' }
    ]
  })

  console.log('Creando aplicaciones de catálogo...')
  const appGoogle = await prisma.aplicacion.create({ data: { nombre: 'Google Workspace', descripcion: 'Correo corporativo y almacenamiento Drive' } })
  const appMS = await prisma.aplicacion.create({ data: { nombre: 'Microsoft 365', descripcion: 'Suite Office, Teams y Azure AD Cloud' } })
  const appJira = await prisma.aplicacion.create({ data: { nombre: 'Jira Software', descripcion: 'Gestión de proyectos y soporte IT' } })
  const appAnyDesk = await prisma.aplicacion.create({ data: { nombre: 'AnyDesk', descripcion: 'Soporte remoto y asistencia técnica' } })
  const appKawak = await prisma.aplicacion.create({ data: { nombre: 'Kawak', descripcion: 'Sistema de gestión de calidad y de procesos' } })
  const appRenapp = await prisma.aplicacion.create({ data: { nombre: 'Usuarios de Renapp', descripcion: 'Plataforma interna de aplicaciones REN' } })
  const appSophos = await prisma.aplicacion.create({ data: { nombre: 'Sophos Antivirus', descripcion: 'Control de seguridad endpoint de Sophos' } })
  const appVPN = await prisma.aplicacion.create({ data: { nombre: 'VPN', descripcion: 'Acceso seguro a la red interna y VPN corporativa' } })
  const appWAVE = await prisma.aplicacion.create({ data: { nombre: 'WAVE', descripcion: 'Plataforma corporativa WAVE de comunicación' } })

  console.log('Creando matriz de accesos...')
  await prisma.acceso.createMany({
    data: [
      { colaborador_id: col1.id, aplicacion_id: appGoogle.id, estado: 'Activo' },
      { colaborador_id: col1.id, aplicacion_id: appJira.id, estado: 'Activo' },
      { colaborador_id: col1.id, aplicacion_id: appSophos.id, estado: 'Activo' },
      { colaborador_id: col1.id, aplicacion_id: appVPN.id, estado: 'Activo' },
      { colaborador_id: col2.id, aplicacion_id: appGoogle.id, estado: 'Activo' },
      { colaborador_id: col2.id, aplicacion_id: appMS.id, estado: 'Activo' },
      { colaborador_id: col2.id, aplicacion_id: appSophos.id, estado: 'Activo' },
      { colaborador_id: col3.id, aplicacion_id: appGoogle.id, estado: 'Activo' },
      { colaborador_id: col3.id, aplicacion_id: appJira.id, estado: 'Activo' },
      { colaborador_id: col3.id, aplicacion_id: appAnyDesk.id, estado: 'Activo' },
      { colaborador_id: col3.id, aplicacion_id: appSophos.id, estado: 'Activo' },
      { colaborador_id: col5.id, aplicacion_id: appGoogle.id, estado: 'Revocado' },
      { colaborador_id: col5.id, aplicacion_id: appMS.id, estado: 'Revocado' }
    ]
  })

  console.log('Creando caché local de Google Workspace...')
  await prisma.usuarioGoogle.createMany({
    data: [
      { google_id: 'G-101', nombre: 'Juan Pérez', correo: 'jperez@renconsultores.com.co', activo: true, area: 'Tecnología', ultimo_inicio_sesion: new Date() },
      { google_id: 'G-102', nombre: 'Ana Gómez', correo: 'agomez@renconsultores.com.co', activo: true, area: 'Finanzas', ultimo_inicio_sesion: new Date() },
      { google_id: 'G-103', nombre: 'Carlos Ruiz', correo: 'cruiz@renconsultores.com.co', activo: true, area: 'Desarrollo', ultimo_inicio_sesion: new Date() },
      { google_id: 'G-104', nombre: 'Diana Beltrán', correo: 'dbeltran@renconsultores.com.co', activo: true, area: 'Marketing', ultimo_inicio_sesion: new Date() },
      { google_id: 'G-105', nombre: 'Andrés Cabrera', correo: 'acabrera@renconsultores.com.co', activo: false, area: 'Soporte', ultimo_inicio_sesion: new Date() }
    ]
  })

  console.log('Creando caché local de Microsoft 365...')
  await prisma.usuarioM365.createMany({
    data: [
      { user_id: 'M-301', nombre: 'Juan Pérez', correo: 'jperez@renconsultores.com.co', activo: true, licencias: 'Office 365 E3, Power BI Pro', ultimo_inicio_sesion: new Date() },
      { user_id: 'M-302', nombre: 'Ana Gómez', correo: 'agomez@renconsultores.com.co', activo: true, licencias: 'Office 365 E5', ultimo_inicio_sesion: new Date() },
      { user_id: 'M-305', nombre: 'Andrés Cabrera', correo: 'acabrera@renconsultores.com.co', activo: false, licencias: '', ultimo_inicio_sesion: new Date() }
    ]
  })

  console.log('Creando logs de auditoría forense...')
  await prisma.auditoria.createMany({
    data: [
      { accion: 'Sincronización Jira Assets', detalles: 'Se sincronizaron 5 colaboradores y 3 equipos desde Jira Assets de forma exitosa', usuario_auditor: 'admin@renconsultores.com.co', ip_origen: '127.0.0.1' },
      { accion: 'Creación de Política de Seguridad', detalles: 'Creada política de bloqueo de pantalla local para desvinculaciones mediante WebSocket', usuario_auditor: 'admin@renconsultores.com.co', ip_origen: '127.0.0.1' }
    ]
  })

  console.log('Semilla REN completada exitosamente.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
