import { Request, Response } from 'express';
import { UnitService } from '../services/unitServices';

export const getUnits = async (_req: Request, res: Response) => {
  try {
    const units = await UnitService.getAllUnits();
    if (units) {
      res.status(201).json(units);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUnitById = async (req: Request, res: Response) => {
  try {
    const unit = await UnitService.getUnitById(parseInt(req.params.unit_id, 10));
    if (unit) {
      res.status(201).json(unit);
    } else {
      res.status(404).json({ message: 'No se encontró la unidad' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUnit = async (req: Request, res: Response) => {
  try {
    const newUnit = await UnitService.addUnit(req.body);
    if (newUnit) {
      res.status(201).json(newUnit);
    } else {
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUnit = async (req: Request, res: Response) => {
  try {
    const updatedUnit = await UnitService.modifyUnit(parseInt(req.params.unit_id, 10), req.body);
    if (updatedUnit) {
      res.status(201).json(updatedUnit);
    } else {
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUnit = async (req: Request, res: Response) => {
  try {
    const deleted = await UnitService.deleteUnit(parseInt(req.params.unit_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Se eliminó la unidad.' });
    } else {
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
