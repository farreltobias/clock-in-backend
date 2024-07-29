import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Employee } from '../../enterprise/entities/employee'
import { CPF } from '../../enterprise/entities/value-objects/cpf'
import { EmployeesRepository } from '../repositories/employees-repository'
import { EmployeeAlreadyExistsError } from './errors/employee-already-exists-error'
import { InvalidCPFError } from './errors/invalid-cpf-error'

interface CreateEmployeeDTO {
  name: string
  cpf: string
}

type CreateEmployeeResponse = Either<
  ResourceNotFoundError,
  { employee: Employee }
>

@Injectable()
export class CreateEmployeeUseCase {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    name,
    cpf,
  }: CreateEmployeeDTO): Promise<CreateEmployeeResponse> {
    const employeeFound = await this.employeesRepository.findByCPF(cpf)

    if (employeeFound) {
      return left(new EmployeeAlreadyExistsError(employeeFound.cpf.toString()))
    }

    if (!CPF.validate(cpf)) {
      return left(new InvalidCPFError())
    }

    const employee = Employee.create({
      name,
      cpf: CPF.create(cpf),
    })

    this.employeesRepository.create(employee)

    return right({
      employee,
    })
  }
}
