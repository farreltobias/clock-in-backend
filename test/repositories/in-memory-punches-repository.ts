import { PunchesRepository } from '@/domain/clock/application/repositories/punches-repository'
import { Punch } from '@/domain/clock/enterprise/entities/punch'

export class InMemoryPunchesRepository implements PunchesRepository {
  public items: Punch[] = []

  async findByEmployeeIdAndDate(
    employeeId: string,
    date: Date,
  ): Promise<Punch | null> {
    const punch = this.items.find(
      (item) =>
        item.employeeId.toString() === employeeId &&
        item.date.toDateString() === date.toDateString(),
    )

    if (!punch) {
      return null
    }

    return punch
  }

  async create(punch: Punch) {
    this.items.push(punch)
  }
}
