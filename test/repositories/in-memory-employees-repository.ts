import { EmployeesRepository } from '@/domain/clock/application/repositories/employees-repository'
import { Employee } from '@/domain/clock/enterprise/entities/employee'

export class InMemoryEmployeesRepository implements EmployeesRepository {
  public items: Employee[] = []

  async findByCPF(cpf: string): Promise<Employee | null> {
    const employee = this.items.find((item) => item.cpf.equals(cpf))

    if (!employee) {
      return null
    }

    return employee
  }

  async findById(id: string): Promise<Employee | null> {
    const employee = this.items.find((item) => item.id.toString() === id)

    if (!employee) {
      return null
    }

    return employee
  }

  async findByCode(code: string): Promise<Employee | null> {
    const employee = this.items.find((item) => item.code.equals(code))

    if (!employee) {
      return null
    }

    return employee
  }

  async create(employee: Employee) {
    this.items.push(employee)
  }
}
