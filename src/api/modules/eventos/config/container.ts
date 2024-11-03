import {container} from "tsyringe";

import {EventoRepository} from "../typeorm/repositories/EventoRepository";
import  EventoService from "../services/EventoService";
import EventoController from "../controller/EventoController";


container.registerSingleton(EventoRepository);
container.registerSingleton(EventoService);
container.registerSingleton(EventoController);
container.resolve(EventoRepository);

export  default container