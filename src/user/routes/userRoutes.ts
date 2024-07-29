import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, loginUser, getUserByUsername } from '../controllers/userControllers';
import { authMiddleware } from '../../shared/middlewares/auth';

const userRoutes: Router = Router();

userRoutes.post('/login', loginUser);
// Ruta pública para buscar usuario por nombre
userRoutes.get('/search', getUserByUsername);  // Sin authMiddleware

// Rutas protegidas que requieren autenticación
userRoutes.get('/', authMiddleware, getUsers);
userRoutes.get('/:user_id', authMiddleware, getUserById);
userRoutes.post('/', authMiddleware, createUser);
userRoutes.put('/:user_id', authMiddleware, updateUser);
userRoutes.delete('/:user_id', authMiddleware, deleteUser);

export default userRoutes;
