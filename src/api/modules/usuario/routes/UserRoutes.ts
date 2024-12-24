import {Router} from 'express';
import UserController from "../controller/UserController";
import container from "../../../containes/container";
import userAuthenticated from "../middlewares/UserAuthenticated";
const userRoutes = Router();
const userController = container.resolve(UserController) //obter a instancia do UserController;


userRoutes.post('/', userController.creatUser.bind(userController));
userRoutes.put('/', userController.updateUser.bind(userController));
userRoutes.get('/:id', userAuthenticated, userController.finByIdUser.bind(userController));
userRoutes.get('/', userController.findAllUsers.bind(userController));
userRoutes.delete('/:id', userController.deleteUser.bind(userController));
userRoutes.post('/session', userController.sessionUser.bind(userController));

export default userRoutes;
