import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface PunchTimeProps {
  punchId: UniqueEntityID
  timeId: UniqueEntityID
}

export class PunchTime extends Entity<PunchTimeProps> {
  get punchId() {
    return this.props.punchId
  }

  get timeId() {
    return this.props.timeId
  }

  static create(props: PunchTimeProps, id?: UniqueEntityID) {
    const punchTime = new PunchTime(props, id)

    return punchTime
  }
}
