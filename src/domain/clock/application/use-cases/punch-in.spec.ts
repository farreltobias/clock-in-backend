import { makeEmployee } from 'test/factories/make-employee'
import { makePunch } from 'test/factories/make-punch'
import { makeTime } from 'test/factories/make-time'
import { InMemoryEmployeesRepository } from 'test/repositories/in-memory-employees-repository'
import { InMemoryPunchesRepository } from 'test/repositories/in-memory-punches-repository'
import { InMemoryTimesRepository } from 'test/repositories/in-memory-times-repository'

import { AlreadyPunchedInError } from './errors/already-punched-in-error'
import { PunchInUseCase } from './punch-in'

let inMemoryTimesRepository: InMemoryTimesRepository
let inMemoryPunchesRepository: InMemoryPunchesRepository
let inMemoryEmployeesRepository: InMemoryEmployeesRepository
let sut: PunchInUseCase

describe('Punch In Use Case', () => {
  beforeEach(() => {
    inMemoryTimesRepository = new InMemoryTimesRepository()
    inMemoryPunchesRepository = new InMemoryPunchesRepository()
    inMemoryEmployeesRepository = new InMemoryEmployeesRepository()
    sut = new PunchInUseCase(
      inMemoryEmployeesRepository,
      inMemoryPunchesRepository,
      inMemoryTimesRepository,
    )
  })

  it('should be able to punch in', async () => {
    const employee = makeEmployee()
    inMemoryEmployeesRepository.items.push(employee)

    const result = await sut.execute({
      code: employee.code.toString(),
      date: new Date('2021-01-01T00:00:00'),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      punch: expect.objectContaining({
        employeeId: employee.id,
        date: new Date('2021-01-01T00:00:00'),
      }),
      time: expect.objectContaining({
        start: new Date('2021-01-01T00:00:00'),
      }),
    })
  })

  it('should not be able to punch in if already punched in', async () => {
    const employee = makeEmployee()
    inMemoryEmployeesRepository.items.push(employee)

    const punch = makePunch({ employeeId: employee.id })
    inMemoryPunchesRepository.items.push(punch)

    const time = makeTime({ punchId: punch.id, start: punch.date })
    inMemoryTimesRepository.items.push(time)

    const result = await sut.execute({
      code: employee.code.toString(),
      date: time.start,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyPunchedInError)
  })
})
