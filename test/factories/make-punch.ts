import { faker } from '@faker-js/faker'

// import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Punch, PunchProps } from '@/domain/clock/enterprise/entities/punch'
// import { PrismaPunchMapper } from '@/infra/database/prisma/mappers/prisma-punch-mapper'
// import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makePunch(
  override: Partial<PunchProps> = {},
  id?: UniqueEntityID,
) {
  const punch = Punch.create(
    {
      date: faker.date.recent(),
      employeeId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return punch
}

// @Injectable()
// export class PunchFactory {
//   constructor(private prisma: PrismaService) {}

//   async makePrismaPunch(
//     data: Partial<PunchProps> = {},
//   ): Promise<Punch> {
//     const punch = makePunch(data)

//     await this.prisma.punch.create({
//       data: PrismaPunchMapper.toPrisma(punch),
//     })

//     return punch
//   }
// }
