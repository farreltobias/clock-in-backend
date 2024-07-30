import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface PunchProps {
  date: Date
  employeeId: UniqueEntityID

  total: number
  break?: number | null
  overtime?: number | null
  negative?: number | null

  createdAt: Date
  updatedAt?: Date | null
}

export class Punch extends Entity<PunchProps> {
  get date(): Date {
    return this.props.date
  }

  get employeeId(): UniqueEntityID {
    return this.props.employeeId
  }

  get total(): number {
    return this.props.total
  }

  set total(total: number) {
    this.props.total = total
    this.touch()
  }

  get break(): number | null | undefined {
    return this.props.break
  }

  set break(breakTime: number | null | undefined) {
    this.props.break = breakTime
    this.touch()
  }

  get overtime(): number | null | undefined {
    return this.props.overtime
  }

  set overtime(overtime: number | null | undefined) {
    this.props.overtime = overtime
    this.touch()
  }

  get negative(): number | null | undefined {
    return this.props.negative
  }

  set negative(negative: number | null | undefined) {
    this.props.negative = negative
    this.touch()
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<PunchProps, 'createdAt' | 'total'>,
    id?: UniqueEntityID,
  ): Punch {
    return new Punch(
      {
        ...props,
        total: props.total ?? 0,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
