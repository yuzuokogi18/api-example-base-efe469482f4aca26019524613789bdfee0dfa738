import { Request, Response } from 'express';
import { EmployeesService } from '../services/employeesServices';

export const getEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await EmployeesService.getAllEmployees();
    if (employees) {
      res.status(201).json(employees);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await EmployeesService.getEmployeeById(parseInt(req.params.employees_id, 10));
    if (employee) {
      res.status(201).json(employee);
    } else {
      res.status(404).json({ message: 'No se encontró el empleado' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const newEmployee = await EmployeesService.addEmployee(req.body);
    if (newEmployee) {
      res.status(201).json(newEmployee);
    } else {
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const updatedEmployee = await EmployeesService.modifyEmployee(parseInt(req.params.employees_id, 10), req.body);
    if (updatedEmployee) {
      res.status(201).json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const deleted = await EmployeesService.deleteEmployee(parseInt(req.params.employees_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Se eliminó el empleado.' });
    } else {
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
