import { Request, Response } from 'express';
import { UserUnitService } from '../services/user_unitServices';

export const getUserUnits = async (_req: Request, res: Response) => {
  try {
    const userUnits = await UserUnitService.getAllUserUnits();
    if (userUnits) {
      res.status(200).json(userUnits);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserUnitById = async (req: Request, res: Response) => {
  try {
    const userUnit = await UserUnitService.getUserUnitById(parseInt(req.params.user_unit_id, 10));
    if (userUnit) {
      res.status(200).json(userUnit);
    } else {
      res.status(404).json({ message: 'No se encontró la user_unit' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUserUnit = async (req: Request, res: Response) => {
  try {
    const newUserUnit = await UserUnitService.addUserUnit(req.body);
    if (newUserUnit) {
      res.status(201).json(newUserUnit);
    } else {
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserUnit = async (req: Request, res: Response) => {
  try {
    const updatedUserUnit = await UserUnitService.modifyUserUnit(parseInt(req.params.user_unit_id, 10), req.body);
    if (updatedUserUnit) {
      res.status(200).json(updatedUserUnit);
    } else {
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserUnit = async (req: Request, res: Response) => {
  try {
    const deleted = await UserUnitService.deleteUserUnit(parseInt(req.params.user_unit_id, 10));
    if (deleted) {
      res.status(200).json({ message: 'Se eliminó la user_unit.' });
    } else {
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
