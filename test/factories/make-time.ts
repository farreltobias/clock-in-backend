import { faker } from '@faker-js/faker'

// import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Time, TimeProps } from '@/domain/clock/enterprise/entities/time'
// import { PrismaTimeMapper } from '@/infra/database/prisma/mappers/prisma-time-mapper'
// import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeTime(
  override: Partial<TimeProps> = {},
  id?: UniqueEntityID,
) {
  const time = Time.create(
    {
      start: faker.date.recent(),
      punchId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return time
}

// @Injectable()
// export class TimeFactory {
//   constructor(private prisma: PrismaService) {}

//   async makePrismaTime(
//     data: Partial<TimeProps> = {},
//   ): Promise<Time> {
//     const time = makeTime(data)

//     await this.prisma.time.create({
//       data: PrismaTimeMapper.toPrisma(time),
//     })

//     return time
//   }
// }
