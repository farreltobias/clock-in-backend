import { WatchedList } from '@/core/entities/watched-list'
import { EmployeePunch } from './employee-punch'

export class EmployeePunchList extends WatchedList<EmployeePunch> {
  compareItems(a: EmployeePunch, b: EmployeePunch): boolean {
    return a.timeId.equals(b.timeId)
  }
}
