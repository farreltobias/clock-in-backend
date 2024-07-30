import { PaginationParams } from '@/core/repositories/pagination-params'

import { Time } from '../../enterprise/entities/time'

export type FindManyByPunchIdDTO = {
  punchId: string
} & PaginationParams

export abstract class TimesRepository {
  abstract findManyByPunchId(params: FindManyByPunchIdDTO): Promise<Time[]>
  abstract create(time: Time): Promise<void>
  abstract save(time: Time): Promise<void>
}
