import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { CPF } from './value-objects/cpf'
import { EmployeeStatus } from './value-objects/employee-status'
import { NanoID } from './value-objects/nano-id'

export interface EmployeeProps {
  name: string
  cpf: CPF
  code: NanoID
  status: EmployeeStatus
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

  static create(
    props: Optional<EmployeeProps, 'code' | 'status'>,
    id?: UniqueEntityID,
  ): Employee {
    return new Employee(
      {
        ...props,
        code: props.code ?? NanoID.create(),
        status: props.status ?? EmployeeStatus.IDLE,
      },
      id,
    )
  }
}
