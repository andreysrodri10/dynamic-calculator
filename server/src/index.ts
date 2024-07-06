import WebSocket, { Server } from 'ws'
import WebSocketController from './controllers/WebSocketController'
import Functions from './utils/Functions'

const port = 8080
const server = new Server({ port })

// Event when a connection is started
server.on('connection', (socket: WebSocket) => {
  console.log('Client connected')

  socket.on('message', (message) => {
    const tokenFromClient = JSON.parse(message.toString())?.token

    if (!Functions.isValidHmacToken(tokenFromClient, '98SADF9843', 'tasks-dashboard')) {
      console.log('Invalid HMAC token. Client not authenticated.')

      server.close()
    }

    const webSocketController = new WebSocketController()

    webSocketController.processAndSendOperations(socket)
      .catch(() => {
        console.error('Error processing operations.')
      })
  })
})

// Setting headers to prevent CORS issues
server.on('headers', (headers) => {
  headers.push('Access-Control-Allow-Origin: *')
  headers.push('Access-Control-Allow-Methods: GET, POST')
  headers.push('Access-Control-Allow-Headers: Content-Type')
})
