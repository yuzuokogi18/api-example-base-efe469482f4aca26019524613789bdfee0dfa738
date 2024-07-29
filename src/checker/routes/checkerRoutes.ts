import { Router } from 'express';
import { getCheckers, getCheckerById, createChecker, updateChecker, deleteChecker,getCheckerByName,getCheckerByUnitNumber } from '../controllers/checkerController';
import { authMiddleware } from '../../shared/middlewares/auth';

const checkerRoutes: Router = Router();

checkerRoutes.get('/', getCheckers);
checkerRoutes.get('/:checker_id', authMiddleware, getCheckerById);
checkerRoutes.get('/name/:name', getCheckerByName);
checkerRoutes.get('/unit/:unitNumber', getCheckerByUnitNumber); 
checkerRoutes.post('/', createChecker);
checkerRoutes.put('/:checker_id', updateChecker);
checkerRoutes.delete('/:checker_id', deleteChecker);

export default checkerRoutes;
