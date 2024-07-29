import { WatchedList } from '@/core/entities/watched-list'
import { PunchTime } from './punch-time'

export class PunchTimeList extends WatchedList<PunchTime> {
  compareItems(a: PunchTime, b: PunchTime): boolean {
    return a.timeId.equals(b.timeId)
  }
}
