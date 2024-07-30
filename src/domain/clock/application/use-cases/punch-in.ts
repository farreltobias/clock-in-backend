import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Punch } from '../../enterprise/entities/punch'
import { Time } from '../../enterprise/entities/time'
import { EmployeesRepository } from '../repositories/employees-repository'
import { PunchesRepository } from '../repositories/punches-repository'
import { TimesRepository } from '../repositories/times-repository'
import { AlreadyPunchedInError } from './errors/already-punched-in-error'

interface PunchInDTO {
  date: Date
  code: string
}

type PunchInResponse = Either<
  ResourceNotFoundError,
  {
    punch: Punch
    time: Time
  }
>

@Injectable()
export class PunchInUseCase {
  constructor(
    private employeesRepository: EmployeesRepository,
    private punchesRepository: PunchesRepository,
    private timesRepository: TimesRepository,
  ) {}

  async execute({ code, date }: PunchInDTO): Promise<PunchInResponse> {
    const employee = await this.employeesRepository.findByCode(code)

    if (!employee) {
      return left(new ResourceNotFoundError())
    }

    let punch = await this.punchesRepository.findByEmployeeIdAndDate(
      employee.id.toString(),
      date,
    )

    if (!punch) {
      punch = Punch.create({
        date,
        employeeId: employee.id,
      })
    }

    const times = await this.timesRepository.findManyByPunchIdAndDate({
      punchId: punch.id.toString(),
      date,
      page: 1,
    })

    const lastTime = times.reduce((acc: Time | null, time) => {
      if (!acc) return time

      if (time.start > acc.start) {
        return time
      }

      return acc
    }, null)

    if (lastTime && !lastTime.end) {
      return left(new AlreadyPunchedInError())
    }

    const time = Time.create({
      start: date,
      punchId: punch.id,
    })

    await this.timesRepository.create(time)

    return right({
      punch,
      time,
    })
  }
}
