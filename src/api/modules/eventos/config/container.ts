import {container} from "tsyringe";

import IEventoRepository from "../services/interfaces/IEventoRepository";
import {EventoRepository} from "../typeorm/repositories/EventoRepository";
import  EventoService from "../services/EventoService";
import EventoController from "../controller/EventoController";
import Evento from "../typeorm/entities/Evento";


// o container e aonde vai realizar a nossa injeção de dependecia
// o metodo registerSingleton me diz que ao inves de criar uma nova instancia toda vez que houver uma request, apenas utilize
// a instancia ja existente.
// container.register<EventoController>(EventoController, {useClass: EventoController});
//
// container.register<EventoService>(
//     EventoService,
//     {useClass: EventoService}
// );
//
// container.register<IEventoRepository>( // indica que o tipo a ser registrado implementa a interface IEvento.  Essa interface define o contrato que a classe EventoRepository deve seguir
//     EventoRepository,
//     EventoRepository
// )

container.registerSingleton(EventoRepository);
container.registerSingleton(EventoService);
container.registerSingleton(EventoController);
container.resolve(EventoRepository);

export  default container