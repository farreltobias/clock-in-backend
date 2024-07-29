import { Employee } from '../../enterprise/entities/employee'

export abstract class EmployeesRepository {
  abstract findByCPF(cpf: string): Promise<Employee | null>
  abstract findByCode(code: string): Promise<Employee | null>
  abstract findById(id: string): Promise<Employee | null>
  abstract create(employee: Employee): Promise<void>
}
