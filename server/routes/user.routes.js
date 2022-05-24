import Router from 'express'
const router = new Router();
import UserController from '../controllers/UserController.js';

// router.post('/users', UserController.create);
router.get('/users', UserController.getUsers);
router.post('/users', UserController.createUser);

// router.get('/user/:id', userController.getOneUser);
// router.put('/user', userController.updateUser);
// router.post('/user/:id', userController.deleteUser);

export default router;