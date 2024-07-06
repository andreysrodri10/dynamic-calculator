import { isAxiosError } from 'axios'
import { TaskResponseInterface } from '../interfaces/TaskResponseInterface'
import TaskModel from '../models/TaskModel'
import ADPApiService from './ADPApiService'
import { WebSocketMessageInterface } from '../interfaces/WebSocketMessageInterface'

class TaskService {
  /**
    * Process the operation which involves fetching the task, calculating based on its response, and submitting to validate the result.
    *
    * @returns Promise<WebSocketMessageInterface>
    */
  public async processOperation (): Promise<WebSocketMessageInterface> {
    const ADPService = new ADPApiService()

    const taskResponse: TaskResponseInterface = await ADPService.getTask()

    const task = new TaskModel(taskResponse.id, taskResponse.operation, taskResponse.left, taskResponse.right)

    const result = task.calcByOperation()

    let errorRequest = false
    let errorMessage = ''

    try {
      await ADPService.submitTask({
        id: task.id,
        result
      })
    } catch (error) {
      errorRequest = true

      if (isAxiosError(error)) {
        switch (error.response?.status) {
        case 400:
          errorMessage = 'Incorrect value in result; no ID specified; value is invalid'
          break
        case 404:
          errorMessage = 'Value not found for specified ID'
          break
        case 503:
          errorMessage = 'Error communicating with database'
          break
        default:
          break
        }
      }
    }

    return {
      operation: task.operation,
      success: !errorMessage,
      requestError: {
        error: errorRequest,
        message: errorMessage
      }
    }
  }
}

export default TaskService
