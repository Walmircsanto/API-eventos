import {container} from "tsyringe";

import UsersRepository from "../modules/usuario/typeorm/repositories/UserRepository";
import UserService from "../modules/usuario/service/UserService";
import UserController from "../modules/usuario/controller/UserController";
import EventSubscribe from "../modules/usuario/service/EventSubscribe";
import UserEvents from "../modules/usuario/service/UserEvents";

container.registerSingleton(UserController);

container.register('IUserRepository', {useValue: UsersRepository})
//para essa instancia ser utilizada e aqui que eu digo para a classe instanciaa

container.registerSingleton(UserService);
container.registerSingleton(EventSubscribe)
container.registerSingleton(UserEvents)
export default container