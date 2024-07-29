import { customAlphabet } from 'nanoid'

export class NanoID {
  private value: string

  toString(): string {
    return this.value
  }

  toValue(): string {
    return this.value
  }

  constructor(value?: string) {
    if (value) {
      this.value = value
      return
    }

    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const nanoid = customAlphabet(alphabet, 7)

    this.value = nanoid()
  }

  equals(id: NanoID): boolean {
    return id.toValue() === this.value
  }
}
