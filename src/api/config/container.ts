import {container} from "tsyringe";

import EventoRepository from "../modules/eventos/typeorm/repositories/EventoRepository";
import {EventoService} from "../modules/eventos/services/EventoService";
import EventoController from "../modules/eventos/controller/EventoController";
import UsersRepository from "../modules/usuario/typeorm/repositories/UserRepository";
import UserService from "../modules/usuario/service/UserService";
import UserController from "../modules/usuario/controller/UserController";


//basicamente ta dizendo que quando precisar instancia ou usar uma instancia do eventoRepository e esse container que vai gerenciar
container.registerSingleton(EventoRepository);
container.registerSingleton(EventoService);
container.registerSingleton(EventoController);

container.registerSingleton(UserController);

container.register('IUserRepository', {useValue: UsersRepository})
//para essa instancia ser utilizada e aqui que eu digo para a classe instanciaa

container.registerSingleton(UserService);

export default container