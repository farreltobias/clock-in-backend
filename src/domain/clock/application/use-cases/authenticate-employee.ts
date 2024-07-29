import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'

import { Encrypter } from '../cryptography/encrypter'
import { EmployeesRepository } from '../repositories/employees-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateEmployeeRequestUseCase {
  code: string
}

type AuthenticateEmployeeResponseUseCase = Either<
  WrongCredentialsError,
  { accessToken: string }
>

@Injectable()
export class AuthenticateEmployeeUseCase {
  constructor(
    private employeesRepository: EmployeesRepository,
    private encrypter: Encrypter,
  ) {}

  async execute({
    code,
  }: AuthenticateEmployeeRequestUseCase): Promise<AuthenticateEmployeeResponseUseCase> {
    const employee = await this.employeesRepository.findByCode(code)

    if (!employee) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: employee.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
