import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Employees } from '../models/Employees';

export class EmployeesRepository {

  public static async findAll(): Promise<Employees[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM employees', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const employees: Employees[] = results as Employees[];
          resolve(employees);
        }
      });
    });
  }

  public static async findById(employees_id: number): Promise<Employees | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM employees WHERE employees_id = ?', [employees_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const employees: Employees[] = results as Employees[];
          if (employees.length > 0) {
            resolve(employees[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createEmployee(employee: Employees): Promise<Employees> {
    const query = 'INSERT INTO employees (name, position,  user_id, created_at, updated_at, deleted) VALUES ( ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [employee.name, employee.position, employee.user_id, employee.created_at, employee.updated_at, employee.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdEmployeeId = result.insertId;
          const createdEmployee: Employees = { ...employee, employees_id: createdEmployeeId };
          resolve(createdEmployee);
        }
      });
    });
  }

  public static async updateEmployee(employees_id: number, employeeData: Employees): Promise<Employees | null> {
    const query = 'UPDATE employees SET name = ?, position = ?,  user_id = ?, updated_at = ?, deleted = ? WHERE employees_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [employeeData.name, employeeData.position,  employeeData.user_id, employeeData.updated_at, employeeData.deleted, employees_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedEmployee: Employees = { ...employeeData, employees_id: employees_id };
            resolve(updatedEmployee);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteEmployee(employees_id: number): Promise<boolean> {
    const query = 'DELETE FROM employees WHERE employees_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [employees_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
}
