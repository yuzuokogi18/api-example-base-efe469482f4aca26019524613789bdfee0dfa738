import { Request, Response } from 'express';
import { CheckerService } from '../services/checkerService';

export const getCheckers = async (_req: Request, res: Response) => {
  try {
    const checkers = await CheckerService.getAllCheckers();
    res.status(200).json(checkers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCheckerById = async (req: Request, res: Response) => {
  try {
    const checker = await CheckerService.getCheckerById(parseInt(req.params.checker_id, 10));
    if (checker) {
      res.status(200).json(checker);
    } else {
      res.status(404).json({ message: 'No se encontró el checador' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const getCheckerByName = async (req: Request, res: Response) => {
  try {
    const checker = await CheckerService.getCheckerByName(req.params.name);
    if (checker) {
      res.status(200).json({ exists: true });
    } else {
      res.status(404).json({ exists: false });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const getCheckerByUnitNumber = async (req: Request, res: Response) => {
  try {
    const checker = await CheckerService.getCheckerByUnitNumber(req.params.unitNumber);
    if (checker) {
      res.status(200).json({ exists: true });
    } else {
      res.status(404).json({ exists: false });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createChecker = async (req: Request, res: Response) => {
  try {
    const newChecker = await CheckerService.addChecker(req.body);
    res.status(201).json(newChecker);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const updateChecker = async (req: Request, res: Response) => {
  try {
    const updatedChecker = await CheckerService.modifyChecker(parseInt(req.params.checker_id, 10), req.body);
    if (updatedChecker) {
      res.status(200).json(updatedChecker);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteChecker = async (req: Request, res: Response) => {
  try {
    const deleted = await CheckerService.deleteChecker(parseInt(req.params.checker_id, 10));
    if (deleted) {
      res.status(200).json({ message: 'Se eliminó el checador.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
