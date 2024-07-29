import { Router } from 'express';
import { getUnits, getUnitById, createUnit, updateUnit, deleteUnit } from '../controllers/unitControllers';
import { authMiddleware } from '../../shared/middlewares/auth';

const unitRoutes: Router = Router();

unitRoutes.get('/', getUnits);
unitRoutes.get('/:unit_id', authMiddleware, getUnitById);
unitRoutes.post('/', createUnit);
unitRoutes.put('/:unit_id', updateUnit);
unitRoutes.delete('/:unit_id', deleteUnit);

export default unitRoutes;
