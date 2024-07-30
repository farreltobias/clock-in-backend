import dayjs from 'dayjs'

import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface TimeProps {
  start: Date
  end?: Date | null

  totalInMinutes: number
  punchId: UniqueEntityID

  createdAt: Date
  updatedAt?: Date | null
}

export class Time extends Entity<TimeProps> {
  get start(): Date {
    return this.props.start
  }

  set start(start: Date) {
    const { end } = this.props

    if (end && dayjs(start).isAfter(end)) {
      throw new Error('Start date must be before end date')
    }

    if (end && !dayjs(start).isSame(end, 'D')) {
      throw new Error('Start date must be on the same day as end date')
    }

    this.props.start = start
    this.touch()

    if (end) {
      this.setTotal()
    }
  }

  get end(): Date | null | undefined {
    return this.props.end
  }

  set end(end: Date | null | undefined) {
    const { start } = this.props

    if (dayjs(end).isBefore(start)) {
      throw new Error('End date must be after start date')
    }

    if (!dayjs(end).isSame(start, 'D')) {
      throw new Error('End date must be on the same day as start date')
    }

    this.props.end = end
    this.touch()

    this.setTotal()
  }

  get totalInMinutes(): number {
    return this.props.totalInMinutes
  }

  private setTotal() {
    const { start, end } = this.props

    this.props.totalInMinutes = dayjs(end).diff(start, 'm')
  }

  get punchId(): UniqueEntityID {
    return this.props.punchId
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
    props: Optional<TimeProps, 'totalInMinutes' | 'createdAt'>,
    id?: UniqueEntityID,
  ): Time {
    return new Time(
      {
        ...props,
        totalInMinutes: props.totalInMinutes ?? 0,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
