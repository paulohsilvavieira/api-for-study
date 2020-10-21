import { Router } from 'express';
import { AuthController, UsersController } from './controllers';

const route = Router();

route.post('/users', UsersController.create);
route.get('/users', UsersController.all);
route.get('/users/:id', UsersController.read);
route.put('/users/:id', UsersController.update);
route.delete('/users/:id', UsersController.delete);

route.post('/auth/login', AuthController.login);

export default route;
