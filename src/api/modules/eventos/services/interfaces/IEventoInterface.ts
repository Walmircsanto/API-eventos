import Evento from "../../typeorm/entities/Evento";

export default interface IEventoInterface {

    createEvento():Evento
    listEventos():Evento[]
    updateEvento():Evento
    deleteEvento():void
}
