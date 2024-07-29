import { faker } from '@faker-js/faker'
// import { Injectable } from '@nestjs/common'
import fakerBr from 'faker-br'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Employee,
  EmployeeProps,
} from '@/domain/clock/enterprise/entities/employee'
import { CPF } from '@/domain/clock/enterprise/entities/value-objects/cpf'
// import { PrismaEmployeeMapper } from '@/infra/database/prisma/mappers/prisma-employee-mapper'
// import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeEmployee(
  override: Partial<EmployeeProps> = {},
  id?: UniqueEntityID,
) {
  const employee = Employee.create(
    {
      cpf: CPF.create(fakerBr.br.cpf()),
      name: faker.person.fullName(),
      ...override,
    },
    id,
  )

  return employee
}

// @Injectable()
// export class EmployeeFactory {
//   constructor(private prisma: PrismaService) {}

//   async makePrismaEmployee(
//     data: Partial<EmployeeProps> = {},
//   ): Promise<Employee> {
//     const employee = makeEmployee(data)

//     await this.prisma.user.create({
//       data: PrismaEmployeeMapper.toPrisma(employee),
//     })

//     return employee
//   }
// }
