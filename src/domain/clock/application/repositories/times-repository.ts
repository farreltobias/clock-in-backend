import { PaginationParams } from '@/core/repositories/pagination-params'

import { Time } from '../../enterprise/entities/time'

type FindManyByPunchIdAndDateDTO = {
  punchId: string
  date: Date
} & PaginationParams

export abstract class TimesRepository {
  abstract findManyByPunchIdAndDate(
    params: FindManyByPunchIdAndDateDTO,
  ): Promise<Time[]>

  abstract create(time: Time): Promise<void>
}
