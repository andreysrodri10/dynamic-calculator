import { Operation } from '../src/enums/enums'
import TaskModel from '../src/models/TaskModel'

describe('Validanting correctly process calculation by operation', () => {
  it('should correctly process calculation by addition operation', async () => {
    const taskModel = new TaskModel('1a', Operation.addition, 1, 1)

    const result = taskModel.calcByOperation()

    expect(result).toEqual(2)
  })

  it('should correctly process calculation by subtraction operation', async () => {
    const taskModel = new TaskModel('1a', Operation.subtraction, 2, 1)

    const result = taskModel.calcByOperation()

    expect(result).toEqual(1)
  })

  it('should correctly process calculation by division operation', async () => {
    const taskModel = new TaskModel('1a', Operation.division, 2, 2)

    const result = taskModel.calcByOperation()

    expect(result).toEqual(1)
  })

  it('should correctly process calculation by multiplication operation', async () => {
    const taskModel = new TaskModel('1a', Operation.multiplication, 1, 2)

    const result = taskModel.calcByOperation()

    expect(result).toEqual(2)
  })

  it('should correctly process calculation by remainder operation', async () => {
    const taskModel = new TaskModel('1a', Operation.remainder, 4, 2)

    const result = taskModel.calcByOperation()

    expect(result).toEqual(0)
  })
})
