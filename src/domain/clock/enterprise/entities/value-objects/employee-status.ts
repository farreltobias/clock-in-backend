export enum EmployeeStatusEnum {
  IDLE = 'IDLE',
  WORKING = 'WORKING',
}

export class EmployeeStatus {
  public value: EmployeeStatusEnum

  private constructor(value: EmployeeStatusEnum) {
    this.value = value
  }

  static IDLE = new EmployeeStatus(EmployeeStatusEnum.IDLE)

  static create(status: EmployeeStatusEnum) {
    return new EmployeeStatus(status)
  }

  work() {
    if (this.value === EmployeeStatusEnum.WORKING) {
      throw new Error('Employee is already working')
    }

    this.value = EmployeeStatusEnum.WORKING
  }

  idle() {
    if (this.value === EmployeeStatusEnum.IDLE) {
      throw new Error('Employee is already idle')
    }

    this.value = EmployeeStatusEnum.IDLE
  }

  isBefore(status: EmployeeStatusEnum) {
    const statusIndex = Object.keys(EmployeeStatusEnum).indexOf(this.value)
    const newStatusIndex = Object.keys(EmployeeStatusEnum).indexOf(status)

    return statusIndex - 1 === newStatusIndex
  }

  isNext(status: EmployeeStatusEnum) {
    const statusIndex = Object.keys(EmployeeStatusEnum).indexOf(this.value)
    const newStatusIndex = Object.keys(EmployeeStatusEnum).indexOf(status)

    return statusIndex + 1 === newStatusIndex
  }
}
