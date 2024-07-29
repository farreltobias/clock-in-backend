import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { makeEmployee } from 'test/factories/make-employee'
import { InMemoryEmployeesRepository } from 'test/repositories/in-memory-employees-repository'

import { CPF } from '../../enterprise/entities/value-objects/cpf'
import { NanoID } from '../../enterprise/entities/value-objects/nano-id'
import { AuthenticateEmployeeUseCase } from './authenticate-employee'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

let inMemoryEmployeesRepository: InMemoryEmployeesRepository
let fakeEncrypter: FakeEncrypter

let sut: AuthenticateEmployeeUseCase

describe('Authenticate Employee', () => {
  beforeEach(() => {
    inMemoryEmployeesRepository = new InMemoryEmployeesRepository()
    fakeEncrypter = new FakeEncrypter()

    sut = new AuthenticateEmployeeUseCase(
      inMemoryEmployeesRepository,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a employee', async () => {
    const employee = makeEmployee({
      cpf: CPF.create('52998224725'),
      code: NanoID.create('ABC1234'),
    })

    inMemoryEmployeesRepository.items.push(employee)

    const result = await sut.execute({
      code: 'ABC1234',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should not be able to authenticate a employee with wrong credentials', async () => {
    const result = await sut.execute({
      code: 'ABC1234',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
