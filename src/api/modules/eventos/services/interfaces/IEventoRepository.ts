import Evento from "../../typeorm/entities/Evento";
import EventoRequest from "../../dto/EventoRequest";

export default interface IEventoRepository {

    createEvento(evento: EventoRequest): Promise<Evento>
    listEventos():Promise<Evento[]>
    findEventoById(id: number): Promise<Evento>
    updateEvento(evento: IEventoRepository):Promise<Evento>
    deleteEvento(idEvento:number):void
}
