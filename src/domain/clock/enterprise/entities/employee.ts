import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CPF } from './value-objects/cpf'
import { NanoID } from './value-objects/nano-id'
import { Optional } from '@/core/types/optional'
import { EmployeeStatus } from './value-objects/employee-status'
import { EmployeePunchList } from './employee-punch-list'

export interface EmployeeProps {
  name: string
  cpf: CPF
  code: NanoID

  status: EmployeeStatus
  punches: EmployeePunchList
}

export class Employee extends Entity<EmployeeProps> {
  get name(): string {
    return this.props.name
  }

  get cpf(): CPF {
    return this.props.cpf
  }

  get code(): NanoID {
    return this.props.code
  }

  get status(): EmployeeStatus {
    return this.props.status
  }

  set status(status: EmployeeStatus) {
    this.props.status = status
  }

  get punches(): EmployeePunchList {
    return this.props.punches
  }

  static create(
    props: Optional<EmployeeProps, 'code' | 'status' | 'punches'>,
    id?: UniqueEntityID,
  ): Employee {
    return new Employee(
      {
        ...props,
        code: props.code ?? new NanoID(),
        status: props.status ?? EmployeeStatus.IDLE,
        punches: props.punches ?? new EmployeePunchList(),
      },
      id,
    )
  }
}
