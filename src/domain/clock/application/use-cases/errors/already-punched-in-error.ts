import { UseCaseError } from '@/core/errors/use-case-error'

export class AlreadyPunchedInError extends Error implements UseCaseError {
  constructor() {
    super('Employee is already punched in.')
  }
}
