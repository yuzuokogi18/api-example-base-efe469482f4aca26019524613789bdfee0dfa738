import { EmployeesRepository } from "../repositories/EmployeesRepository";
import { Employees } from "../models/Employees";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();

export class EmployeesService {
    public static async getAllEmployees(): Promise<Employees[]> {
        try {
            return await EmployeesRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener empleados: ${error.message}`);
        }
    }

    public static async getEmployeeById(employeesId: number): Promise<Employees | null> {
        try {
            return await EmployeesRepository.findById(employeesId);
        } catch (error: any) {
            throw new Error(`Error al encontrar empleado: ${error.message}`);
        }
    }

    public static async addEmployee(employee: Employees) {
        try {
            employee.created_at = DateUtils.formatDate(new Date());
            employee.updated_at = DateUtils.formatDate(new Date());
            return await EmployeesRepository.createEmployee(employee);
        } catch (error: any) {
            throw new Error(`Error al crear empleado: ${error.message}`);
        }
    }

    public static async modifyEmployee(employeesId: number, employeeData: Employees) {
        try {
            const employeeFound = await EmployeesRepository.findById(employeesId);

            if (employeeFound) {
                if (employeeData.name) employeeFound.name = employeeData.name;
                if (employeeData.position) employeeFound.position = employeeData.position;
                if (employeeData.user_id !== undefined) employeeFound.user_id = employeeData.user_id;
                if (employeeData.deleted !== undefined) employeeFound.deleted = employeeData.deleted;
                
                employeeFound.updated_at = DateUtils.formatDate(new Date());
                return await EmployeesRepository.updateEmployee(employeesId, employeeFound);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error al modificar empleado: ${error.message}`);
        }
    }

    public static async deleteEmployee(employeesId: number): Promise<boolean> {
        try {
            return await EmployeesRepository.deleteEmployee(employeesId);
        } catch (error: any) {
            throw new Error(`Error al eliminar empleado: ${error.message}`);
        }
    }
}
