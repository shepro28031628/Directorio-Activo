import { Server } from 'socket.io'
import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'

export default defineNitroPlugin((nitroApp) => {
  // Placeholder para la ruta de socket.io
  nitroApp.router.use('/socket.io', () => {})

  // Interceptar la petición de Nitro para enlazar el servidor raw de Node
  nitroApp.hooks.hook('request', (event) => {
    const rawServer = (event.node.req.socket as any).server
    if (rawServer && !rawServer._io) {
      const io = new Server(rawServer, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST']
        }
      })
      
      rawServer._io = io

      io.on('connection', (socket) => {
        console.log(`[SOCKET] Cliente conectado: ${socket.id}`)

        socket.on('agente_registrar', (data: any) => {
          const token = data?.token
          if (token) {
            socket.join(token)
            console.log(`[SOCKET] Agente registrado en sala: ${token}`)
            socket.emit('confirmacion', {
              mensaje: 'Agente registrado correctamente en el canal seguro Directorio Activo Ren.',
              sala: token
            })
          }
        })

        socket.on('disconnect', () => {
          console.log(`[SOCKET] Cliente desconectado: ${socket.id}`)
        })
      })
    }
  })
})
