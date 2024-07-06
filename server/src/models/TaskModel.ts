import { Operation } from '../enums/enums'
import Calc from '../utils/Calc'

class TaskModel {
  private _id: string
  private _operation: Operation
  private _left: number
  private _right: number

  constructor (id: string, operation: Operation, left: number, right: number) {
    this._id = id
    this._operation = operation
    this._left = left
    this._right = right
  }

  /**
   * Performs a calculation based on the current operation type.
   * @returns {number | undefined} The result of the operation, or undefined if the operation type is unknown.
   */
  public calcByOperation (): number | undefined {
    switch (this._operation) {
    case Operation.addition:
      return Calc.addition(this._left, this._right)

    case Operation.subtraction:
      return Calc.subtraction(this._left, this._right)

    case Operation.multiplication:
      return Calc.multiplication(this._left, this._right)

    case Operation.remainder:
      return Calc.remainder(this._left, this._right)

    case Operation.division:
      return Calc.division(this._left, this._right)

    default:
      break
    }
  }

  // Getter and setter for id
  public get id (): string {
    return this._id
  }

  public set id (value: string) {
    this._id = value
  }

  // Getter and setter for operation
  public get operation (): Operation {
    return this._operation
  }

  public set operation (value: Operation) {
    this._operation = value
  }

  // Getter and setter for left
  public get left (): number {
    return this._left
  }

  public set left (value: number) {
    this._left = value
  }

  // Getter and setter for right
  public get right (): number {
    return this._right
  }

  public set right (value: number) {
    this._right = value
  }
}

export default TaskModel
