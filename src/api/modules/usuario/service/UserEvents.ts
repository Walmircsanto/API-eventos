import {inject, injectable} from "tsyringe";
import EventoRepository from "../../eventos/typeorm/repositories/EventoRepository";

@injectable()
export default class UserEvents {
    constructor(@inject(EventoRepository) private eventoRepository: EventoRepository) {
    }

    public async findEventsUser(id:number){
       return await this.eventoRepository.findEventsUser(id)
    }
}