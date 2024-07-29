export enum TimeTypeEnum {
  WORK = 'WORK',
  BREAK = 'BREAK',
}

export class TimeType {
  public value: TimeTypeEnum

  private constructor(value: TimeTypeEnum) {
    this.value = value
  }

  static create(status: TimeTypeEnum) {
    return new TimeType(status)
  }
}
