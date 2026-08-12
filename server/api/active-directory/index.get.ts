import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  // Datos estructurados de la arquitectura Core de Active Directory
  return {
    domain: {
      name: 'ren.local',
      netbios: 'REN',
      forestLevel: 'Windows Server 2022',
      domainControllers: [
        { name: 'DC01-BOG.ren.local', ip: '192.168.10.5', role: 'PDC Emulator / GC', status: 'Online', latencyMs: 2 },
        { name: 'DC02-BOG.ren.local', ip: '192.168.10.6', role: 'Replica / GC', status: 'Online', latencyMs: 3 }
      ]
    },

    // 1. Estructura de Unidades Organizativas (OUs)
    organizationalUnits: [
      {
        id: 'ou-corp',
        name: 'REN Corporativo',
        dn: 'OU=REN Corporativo,DC=ren,DC=local',
        type: 'DomainRoot',
        count: 450,
        children: [
          {
            id: 'ou-bogota',
            name: 'Sede Bogotá',
            dn: 'OU=Sede Bogota,OU=REN Corporativo,DC=ren,DC=local',
            type: 'Location',
            count: 280,
            children: [
              { id: 'ou-bog-ti', name: 'Departamento TI', dn: 'OU=TI,OU=Sede Bogota,OU=REN Corporativo,DC=ren,DC=local', type: 'Department', count: 45 },
              { id: 'ou-bog-fin', name: 'Finanzas & Admin', dn: 'OU=Finanzas,OU=Sede Bogota,OU=REN Corporativo,DC=ren,DC=local', type: 'Department', count: 85 },
              { id: 'ou-bog-hr', name: 'Gestión Humana', dn: 'OU=RRHH,OU=Sede Bogota,OU=REN Corporativo,DC=ren,DC=local', type: 'Department', count: 150 }
            ]
          },
          {
            id: 'ou-medellin',
            name: 'Sede Medellín',
            dn: 'OU=Sede Medellin,OU=REN Corporativo,DC=ren,DC=local',
            type: 'Location',
            count: 120,
            children: [
              { id: 'ou-med-ops', name: 'Operaciones Medellín', dn: 'OU=Operaciones,OU=Sede Medellin,OU=REN Corporativo,DC=ren,DC=local', type: 'Department', count: 120 }
            ]
          },
          {
            id: 'ou-devices',
            name: 'Equipos & Servidores',
            dn: 'OU=Dispositivos,OU=REN Corporativo,DC=ren,DC=local',
            type: 'DevicesRoot',
            count: 180,
            children: [
              { id: 'ou-workstations', name: 'Workstations (Laptops & Desktops)', dn: 'OU=Workstations,OU=Dispositivos,OU=REN Corporativo,DC=ren,DC=local', type: 'DeviceGroup', count: 145 },
              { id: 'ou-servers', name: 'Servidores de Infraestructura', dn: 'OU=Servidores,OU=Dispositivos,OU=REN Corporativo,DC=ren,DC=local', type: 'DeviceGroup', count: 25 },
              { id: 'ou-kiosks', name: 'Kioskos & Terminales', dn: 'OU=Kioskos,OU=Dispositivos,OU=REN Corporativo,DC=ren,DC=local', type: 'DeviceGroup', count: 10 }
            ]
          }
        ]
      }
    ],

    // 2. Políticas de Grupo (GPOs)
    gpos: [
      {
        id: 'GPO-Sec-Hardening',
        name: 'Hardening & Seguridad de Dominio Base',
        scope: 'Domain-Wide',
        status: 'Active',
        category: 'Seguridad',
        settings: {
          lockoutThreshold: 5,
          lapsEnabled: true,
          auditPol: 'Success & Failure'
        },
        description: 'Aplica hardening CIS Benchmark, política de contraseñas complejas, bloqueo por fallos de inicio de sesión y gestión LAPS de admin local.'
      },
      {
        id: 'GPO-DriveMaps-TI',
        name: 'Mapeo de Unidades de Red - TI & Servidores',
        scope: 'OU=TI',
        status: 'Active',
        category: 'Red & Mapeos',
        settings: {
          drives: [
            { letter: 'Z:', path: '\\\\dc01-bog\\CompartidaTI', label: 'Recursos TI' },
            { letter: 'Y:', path: '\\\\dc01-bog\\Backups', label: 'Repositorio Backups' }
          ]
        },
        description: 'Mapea unidades de red empresariales automáticamente según el departamento del usuario.'
      },
      {
        id: 'GPO-USB-Block',
        name: 'Restricción de Software & Puertos USB',
        scope: 'OU=Finanzas, OU=RRHH',
        status: 'Active',
        category: 'Restricción de Dispositivos',
        settings: {
          usbStorage: 'Disabled',
          appLocker: 'Enforce Whitelist Rules',
          executablesAllowed: ['%PROGRAMFILES%\\*']
        },
        description: 'Inhabilita montaje de memorias USB/Discos externos y aplica reglas de AppLocker para restringir binarios no autorizados.'
      },
      {
        id: 'GPO-LogonScripts',
        name: 'Script PowerShell de Inicio & Auditoría de Agente',
        scope: 'OU=Workstations',
        status: 'Active',
        category: 'Ejecución de Scripts',
        settings: {
          scriptType: 'PowerShell Startup',
          executionPolicy: 'Bypass',
          scriptPath: '\\\\ren.local\\sysvol\\ren.local\\scripts\\CheckRenAgent.ps1'
        },
        description: 'Ejecuta scripts de validación de agente MDM y verificación de inventario en el arranque de la máquina.'
      }
    ],

    // 3. Servicios de Red Integrados (DNS / DHCP)
    networkServices: {
      dns: {
        status: 'Healthy',
        primaryServer: '192.168.10.5 (DC01-BOG)',
        secondaryServer: '192.168.10.6 (DC02-BOG)',
        forwardZones: [
          { name: 'ren.local', type: 'Active Directory Integrated', recordsCount: 420, dynamicUpdates: 'Secure Only' },
          { name: '_msdcs.ren.local', type: 'Forest DNS Zone', recordsCount: 85, dynamicUpdates: 'Secure Only' }
        ],
        reverseZones: [
          { name: '10.168.192.in-addr.arpa', type: 'Active Directory Integrated', recordsCount: 310 }
        ],
        queryResponseTimeMs: 1.2
      },
      dhcp: {
        status: 'Active / High Availability Mode (Failover 50/50)',
        scopes: [
          {
            name: 'Scope-Bogota-LAN',
            subnet: '192.168.10.0/24',
            range: '192.168.10.100 - 192.168.10.220',
            totalIPs: 121,
            activeLeases: 89,
            reservations: 12,
            utilizationPct: 73.5
          },
          {
            name: 'Scope-Medellin-LAN',
            subnet: '192.168.20.0/24',
            range: '192.168.20.100 - 192.168.20.200',
            totalIPs: 101,
            activeLeases: 45,
            reservations: 8,
            utilizationPct: 44.5
          }
        ]
      }
    },

    // 4. Esquema de Permisos / RBAC (Delegación de Control AD)
    rbacScheme: {
      model: 'Tiered Administrative Model (Tier 0 / Tier 1 / Tier 2)',
      roles: [
        {
          id: 'role-tier0',
          name: 'Domain Admin / Enterprise Admin (Tier 0)',
          tier: 'Tier 0',
          membersCount: 2,
          scope: 'Control Total del Bosque AD',
          description: 'Privilegios absolutos restringidos exclusivamente a la administración de Domain Controllers e infraestructura crítica.',
          permissions: ['Full Control sobre Dominio', 'Modificación de Esquema AD', 'Gestión de DCs']
        },
        {
          id: 'role-tier1',
          name: 'Server Admin (Tier 1)',
          tier: 'Tier 1',
          membersCount: 5,
          scope: 'Servidores de Aplicación y Miembros',
          description: 'Administración de servidores de aplicaciones corporativas sin acceso a Domain Controllers ni cuentas de Dominio.',
          permissions: ['Admin Local en Servidores Miembro', 'Reinicio de Servicios', 'Lectura AD']
        },
        {
          id: 'role-tier2-helpdesk',
          name: 'Helpdesk Delegado (Tier 2)',
          tier: 'Tier 2',
          membersCount: 12,
          scope: 'OU=Workstations & OU=Departamentos',
          description: 'Permisos mínimos delegados a nivel de OU para desbloqueo de usuarios, reset de contraseñas y unirse a dominio.',
          permissions: ['Reset Password Usuarios OU', 'Desbloquear Cuentas', 'Modificar Atributos Teléfono/Oficina']
        },
        {
          id: 'role-audit',
          name: 'Auditor de Seguridad y Cumplimiento',
          tier: 'Auditoría',
          membersCount: 3,
          scope: 'Lectura Global AD & Logs',
          description: 'Acceso de solo lectura para auditorías de cumplimiento, revisión de GPOs y exportación de reportes RBAC.',
          permissions: ['Read-Only All AD Objects', 'Read Security Audit Logs', 'Export GPO Reports']
        }
      ]
    }
  }
})
