import { Router } from 'express';
import { getUserUnits, getUserUnitById, createUserUnit, updateUserUnit, deleteUserUnit } from '../controllers/user_unitcontrollers';
import { authMiddleware } from '../../shared/middlewares/auth';

const userUnitRoutes: Router = Router();

userUnitRoutes.get('/', getUserUnits);
userUnitRoutes.get('/:user_unit_id', authMiddleware, getUserUnitById);
userUnitRoutes.post('/', createUserUnit);
userUnitRoutes.put('/:user_unit_id', updateUserUnit);
userUnitRoutes.delete('/:user_unit_id', deleteUserUnit);

export default userUnitRoutes;
