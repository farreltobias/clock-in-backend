import { PaginationParams } from '@/core/repositories/pagination-params'
import { TimesRepository } from '@/domain/clock/application/repositories/times-repository'
import { Time } from '@/domain/clock/enterprise/entities/time'

export class InMemoryTimesRepository implements TimesRepository {
  public items: Time[] = []

  async findManyByPunchIdAndDate(
    params: { punchId: string; date: Date } & PaginationParams,
  ): Promise<Time[]> {
    const times = this.items.filter(
      (item) =>
        item.punchId.toString() === params.punchId &&
        item.start.toDateString() === params.date.toDateString(),
    )

    return times
  }

  async create(time: Time) {
    this.items.push(time)
  }
}
