import {container} from "tsyringe";

import IEventoRepository from "../services/interfaces/IEventoRepository";
import {EventoRepository} from "../typeorm/repositories/EventoRepository";


// o container e aonde vai realizar a nossa injeção de dependecia
// o metodo registerSingleton me diz que ao inves de criar uma nova instancia toda vez que houver uma request, apenas utilize
// a instancia ja existente.
container.registerSingleton<IEventoRepository>( // indica que o tipo a ser registrado implementa a interface IEvento.  Essa interface define o contrato que a classe EventoRepository deve seguir
    'EventoRepository',
    EventoRepository
)

export default container