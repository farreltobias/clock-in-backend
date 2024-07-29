import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { TimeType } from './value-objects/time-type'

export interface TimeProps {
  start: Date
  end: Date
  total: number
  type: TimeType

  createdAt: Date
  updatedAt?: Date | null
}

export class Time extends Entity<TimeProps> {
  get start(): Date {
    return this.props.start
  }

  set start(start: Date) {
    if (this.props.end && start >= this.props.end) {
      throw new Error('Start date must be before end date')
    }

    this.props.start = start
    this.touch()

    if (this.props.end) {
      this.setTotal()
    }
  }

  get end(): Date {
    return this.props.end
  }

  set end(end: Date) {
    if (this.props.start && end <= this.props.start) {
      throw new Error('End date must be after start date')
    }

    this.props.end = end
    this.touch()

    if (this.props.start) {
      this.setTotal()
    }
  }

  get total(): number {
    return this.props.total
  }

  private setTotal() {
    this.props.total = this.props.end.getTime() - this.props.start.getTime()
  }

  get type(): TimeType {
    return this.props.type
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
    props: Optional<TimeProps, 'total' | 'createdAt'>,
    id?: UniqueEntityID,
  ): Time {
    return new Time(
      {
        ...props,
        total: props.total ?? 0,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
