import Router from 'express'
const router = new Router();
import MessageController from '../controllers/MessagesController.js';

// router.post('/users', UserController.create);
router.get('/messages', MessageController.getMessages);


// router.get('/user/:id', userController.getOneUser);
// router.put('/user', userController.updateUser);
// router.post('/user/:id', userController.deleteUser);

export default router;