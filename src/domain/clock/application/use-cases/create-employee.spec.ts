import { InMemoryEmployeesRepository } from 'test/repositories/in-memory-employees-repository'

import { CreateEmployeeUseCase } from './create-employee'

let inMemoryEmployeesRepository: InMemoryEmployeesRepository
let sut: CreateEmployeeUseCase

describe('Create Employee', () => {
  beforeEach(() => {
    inMemoryEmployeesRepository = new InMemoryEmployeesRepository()
    sut = new CreateEmployeeUseCase(inMemoryEmployeesRepository)
  })

  it('should be able to create a new employee', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '12345678909',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      employee: inMemoryEmployeesRepository.items[0],
    })
  })
})
