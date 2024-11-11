import {Router} from 'express';
import UserController from "../controller/UserController";
import container from "../../../config/container";

const userRoutes = Router();
const userController = container.resolve(UserController) //obter a instancia do UserController;


userRoutes.post('/', userController.creatUser.bind(userController));
userRoutes.put('/', userController.updateUser.bind(userController));
userRoutes.get('/:id', userController.finByIdUser.bind(userController));
userRoutes.get('/', userController.findAllUsers.bind(userController));
userRoutes.delete('/:id', userController.deleteUser.bind(userController));

export default userRoutes;
