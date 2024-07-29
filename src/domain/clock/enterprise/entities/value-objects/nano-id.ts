import { customAlphabet } from 'nanoid'

export class NanoID {
  private value: string

  toString(): string {
    return this.value
  }

  toValue(): string {
    return this.value
  }

  private constructor(value: string) {
    this.value = value
  }

  static create(value?: string): NanoID {
    if (!value) {
      const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const nanoid = customAlphabet(alphabet, 7)

      return new NanoID(nanoid())
    }

    if (!NanoID.validate(value)) {
      throw new Error('Invalid NanoID')
    }

    return new NanoID(value)
  }

  equals(value: string | NanoID): boolean {
    return this.value === value.toString()
  }

  static validate(value: string): boolean {
    return /^[0-9A-Z]{7}$/.test(value)
  }
}
