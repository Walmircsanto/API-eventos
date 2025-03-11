import {container} from "tsyringe";
import EventoController from "../modules/eventos/controller/EventoController";
import {EventoService} from "../modules/eventos/services/EventoService";
import EventoRepository from "../modules/eventos/typeorm/repositories/EventoRepository";

//basicamente ta dizendo que quando precisar instancia ou usar uma instancia do eventoRepository e esse containes que vai gerenciar

const containerEvent = container


containerEvent.registerSingleton(EventoRepository);
containerEvent.registerSingleton(EventoService);
containerEvent.registerSingleton(EventoController);

export default containerEvent