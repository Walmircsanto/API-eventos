import Evento from "../../typeorm/entities/Evento";
import EventoRequest from "../../dto/EventoRequest";
import {IRequestEvento} from "../../typeorm/repositories/EventoRepository";

export default interface IEventoRepository {

    createEvento(evento: EventoRequest): Promise<Evento>
    listEventos():Promise<Evento[] | null>

    findEventoById(id: number): Promise<Evento | null>
    updateEvento(evento: Evento):Promise<Evento | null>
    deleteEvento(idEvento:number):void
}
