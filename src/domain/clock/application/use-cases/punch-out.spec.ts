import dayjs from 'dayjs'
import { makeEmployee } from 'test/factories/make-employee'
import { makePunch } from 'test/factories/make-punch'
import { makeTime } from 'test/factories/make-time'
import { InMemoryEmployeesRepository } from 'test/repositories/in-memory-employees-repository'
import { InMemoryPunchesRepository } from 'test/repositories/in-memory-punches-repository'
import { InMemoryTimesRepository } from 'test/repositories/in-memory-times-repository'

import { AlreadyPunchedOutError } from './errors/already-punched-out-error'
import { PunchOutUseCase } from './punch-out'

let inMemoryTimesRepository: InMemoryTimesRepository
let inMemoryPunchesRepository: InMemoryPunchesRepository
let inMemoryEmployeesRepository: InMemoryEmployeesRepository
let sut: PunchOutUseCase

describe('Punch Out Use Case', () => {
  beforeEach(() => {
    inMemoryTimesRepository = new InMemoryTimesRepository()
    inMemoryPunchesRepository = new InMemoryPunchesRepository()
    inMemoryEmployeesRepository = new InMemoryEmployeesRepository()
    sut = new PunchOutUseCase(
      inMemoryEmployeesRepository,
      inMemoryPunchesRepository,
      inMemoryTimesRepository,
    )
  })

  it('should be able to punch out', async () => {
    const employee = makeEmployee()
    inMemoryEmployeesRepository.items.push(employee)

    const punch = makePunch({ employeeId: employee.id })
    inMemoryPunchesRepository.items.push(punch)

    const time = makeTime({ punchId: punch.id, start: punch.date })
    inMemoryTimesRepository.items.push(time)

    const date = dayjs(punch.date).add(1, 'h').toDate()

    const result = await sut.execute({
      code: employee.code.toString(),
      date,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      time: expect.objectContaining({
        end: date,
        totalInMinutes: dayjs(date).diff(time.start, 'minute'),
      }),
    })
  })

  it('should not be able to punch out if already punched out', async () => {
    const employee = makeEmployee()
    inMemoryEmployeesRepository.items.push(employee)

    const punch = makePunch({ employeeId: employee.id })
    inMemoryPunchesRepository.items.push(punch)

    const time = makeTime({
      punchId: punch.id,
      start: punch.date,
      end: dayjs(punch.date).add(1, 'h').toDate(),
    })
    inMemoryTimesRepository.items.push(time)

    const result = await sut.execute({
      code: employee.code.toString(),
      date: time.end as Date,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyPunchedOutError)
  })
})
