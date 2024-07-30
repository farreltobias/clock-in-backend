import { Punch } from '../../enterprise/entities/punch'

export abstract class PunchesRepository {
  abstract findByEmployeeIdAndDate(
    employeeId: string,
    date: Date,
  ): Promise<Punch | null>

  abstract create(punch: Punch): Promise<void>
}
