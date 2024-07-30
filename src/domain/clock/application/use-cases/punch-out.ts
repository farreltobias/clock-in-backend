import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Time } from '../../enterprise/entities/time'
import { EmployeesRepository } from '../repositories/employees-repository'
import { PunchesRepository } from '../repositories/punches-repository'
import { TimesRepository } from '../repositories/times-repository'
import { AlreadyPunchedOutError } from './errors/already-punched-out-error'

interface PunchOutDTO {
  date: Date
  code: string
}

type PunchOutResponse = Either<
  ResourceNotFoundError,
  {
    time: Time
  }
>

@Injectable()
export class PunchOutUseCase {
  constructor(
    private employeesRepository: EmployeesRepository,
    private punchesRepository: PunchesRepository,
    private timesRepository: TimesRepository,
  ) {}

  async execute({ code, date }: PunchOutDTO): Promise<PunchOutResponse> {
    const employee = await this.employeesRepository.findByCode(code)

    if (!employee) {
      return left(new ResourceNotFoundError())
    }

    const punch = await this.punchesRepository.findByEmployeeIdAndDate(
      employee.id.toString(),
      date,
    )

    if (!punch) {
      return left(new ResourceNotFoundError())
    }

    const times = await this.timesRepository.findManyByPunchId({
      punchId: punch.id.toString(),
      page: 1,
    })

    const time = times.reduce((acc: Time | null, time) => {
      if (!acc) return time

      if (time.start > acc.start) {
        return time
      }

      return acc
    }, null)

    if (!time) {
      return left(new ResourceNotFoundError())
    }

    if (time.end) {
      return left(new AlreadyPunchedOutError())
    }

    time.end = date
    await this.timesRepository.save(time)

    return right({
      time,
    })
  }
}
