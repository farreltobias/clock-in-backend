import {
  FindManyByPunchIdDTO,
  TimesRepository,
} from '@/domain/clock/application/repositories/times-repository'
import { Time } from '@/domain/clock/enterprise/entities/time'

export class InMemoryTimesRepository implements TimesRepository {
  public items: Time[] = []

  async findManyByPunchId({
    page,
    punchId,
  }: FindManyByPunchIdDTO): Promise<Time[]> {
    const times = this.items
      .filter((item) => item.punchId.equals(punchId))
      .slice(0, page * 20)

    return times
  }

  async create(time: Time) {
    this.items.push(time)
  }

  async save(time: Time): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(time.id))

    this.items[index] = time
  }
}
