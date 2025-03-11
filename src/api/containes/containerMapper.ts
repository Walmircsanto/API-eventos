import {container} from "tsyringe";
import {EventoMapper} from "../modules/eventos/mapper/EventoMapper";


const containerEventMapper = container;


containerEventMapper.registerSingleton(EventoMapper)

export default containerEventMapper;