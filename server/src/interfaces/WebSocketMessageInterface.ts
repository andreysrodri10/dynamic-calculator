import { Operation } from '../enums/enums'

export interface WebSocketMessageInterface {
  operation: Operation,
  success: boolean,
  requestError: {
    error: boolean,
    message: string
  }
}
