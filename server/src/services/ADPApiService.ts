import axios, { AxiosResponse } from 'axios'
import { TaskResponseInterface } from '../interfaces/TaskResponseInterface'
import { TaskRequestInterface } from '../interfaces/TaskRequestInterface'

class ADPApiService {
  /**
    * Retrieves a task from the ADP api.
    *
    * @returns AxiosResponse<TaskResponseInterface>
    */
  public async getTask (): Promise<TaskResponseInterface> {
    const response: AxiosResponse<TaskResponseInterface> = await axios.get('https://interview.adpeai.com/api/v1/get-task')

    return response.data
  }

  /**
    * Submits a task to the ADP api for processing.
    *
    * @param {TaskRequestInterface} request - The task request object containing task details.
    * @returns AxiosResponse<null>
    */
  public async submitTask (request: TaskRequestInterface): Promise<null> {
    const response: AxiosResponse<null> = await axios.post('https://interview.adpeai.com/api/v1/submit-task', request)

    return response.data
  }
}

export default ADPApiService
