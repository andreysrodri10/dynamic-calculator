import { Operation } from '../enums/enums'

export interface TaskResponseInterface {
  id: string
  operation: Operation
  left: number
  right: number
}
