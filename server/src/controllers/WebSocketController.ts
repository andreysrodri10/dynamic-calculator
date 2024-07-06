import { WebSocket } from 'ws'
import TaskService from '../services/TaskService'
import { WebSocketMessageInterface } from '../interfaces/WebSocketMessageInterface'
import Functions from '../utils/Functions'

class WebSocketController {
  /**
    * Process the operation and send the results to the client by websocket.
    *
    * @param {WebSocket} socket - The WebSocket instance
    * @returns Promise<void>
    */
  public async processAndSendOperations (socket: WebSocket): Promise<void> {
    const taskService = new TaskService()
    let response: WebSocketMessageInterface

    while (true) {
      response = await taskService.processOperation()

      // Send the message to the client
      socket.send(JSON.stringify({
        operation: response.operation,
        success: response.success,
        requestError: {
          error: response.requestError.error,
          message: response.requestError.message
        }
      }))

      // Interval to prevent overloading the API server
      await Functions.sleep(3000)
    }
  }
}

export default WebSocketController
