import { Router } from 'express';
import { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employeesController';
import { authMiddleware } from '../../shared/middlewares/auth';

const employeeRoutes: Router = Router();

employeeRoutes.get('/', getEmployees);
employeeRoutes.get('/:employees_id', authMiddleware, getEmployeeById);
employeeRoutes.post('/', createEmployee);
employeeRoutes.put('/:employees_id', updateEmployee);
employeeRoutes.delete('/:employees_id', deleteEmployee);

export default employeeRoutes;
