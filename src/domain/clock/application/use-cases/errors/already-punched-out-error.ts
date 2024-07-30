import { UseCaseError } from '@/core/errors/use-case-error'

export class AlreadyPunchedOutError extends Error implements UseCaseError {
  constructor() {
    super('Employee is already punched out.')
  }
}
