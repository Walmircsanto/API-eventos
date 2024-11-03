import 'reflect-metadata';
import statusEvento from "../typeorm/entities/enums/EventoStatus";
import AppError from "../../../shared/errors/AppError";
import IEventoRepository from "./interfaces/IEventoRepository";
import {inject, injectable} from "tsyringe";
import {EventoRepository} from "../typeorm/repositories/EventoRepository";
import EventoRequest from "../dto/EventoRequest";
import EventosRouter from "../routes/EventosRouter";

interface IdRequest {
    id: number
}

interface IRequestIMGEvent{
    id:number,
    imgFileName:string
}


@injectable() // indica que a nossa classe recebe a injeção de dependencia
class EventoService {

    constructor(@inject(EventoRepository) private readonly eventoRepository: EventoRepository) {
    }

    public async createEvento({
                                  titulo,
                                  img,
                                  status,
                                  descricao,
                                  dataInicio,
                                  dataFim,
                                  usuariosIds,
                                  certificadoId
                              }: EventoRequest) {

        // if (eventExits) {
        //     throw new AppError("Evento ja existe com esse nome", "Bad request", 400);
        // }


        const evento = await this.eventoRepository.createEvento(
            {
                titulo,
                img,
                status,
                descricao,
                dataInicio,
                dataFim,
                usuariosIds,
                certificadoId
            })
        return evento;
    }


    public async findById({id}: IdRequest) {


        const evento = await this.eventoRepository.findEventoById(id);

        if (!evento) {
            throw new AppError("Event not foud", "Bad request", 400);
        }

        return evento;


    }

    public async findAllEventos(){
        const eventos = await this.eventoRepository.listEventos();

        return eventos;
    }

    private  createAvatarService({id,imgFileName}: IRequestIMGEvent){


     evento.img = imgFileName;
     await this.eventoRepository.updateEvento(evento);

     return evento;
    }

}

 export default EventoService;
