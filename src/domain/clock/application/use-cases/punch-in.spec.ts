import { makeEmployee } from 'test/factories/make-employee'
import { InMemoryEmployeesRepository } from 'test/repositories/in-memory-employees-repository'
import { InMemoryPunchesRepository } from 'test/repositories/in-memory-punches-repository'
import { InMemoryTimesRepository } from 'test/repositories/in-memory-times-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

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

    console.log(result.value)

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
})
