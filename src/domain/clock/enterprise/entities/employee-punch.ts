import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface EmployeePunchProps {
  punchId: UniqueEntityID
  timeId: UniqueEntityID
}

export class EmployeePunch extends Entity<EmployeePunchProps> {
  get punchId() {
    return this.props.punchId
  }

  get timeId() {
    return this.props.timeId
  }

  static create(props: EmployeePunchProps, id?: UniqueEntityID) {
    const employeePunch = new EmployeePunch(props, id)

    return employeePunch
  }
}
