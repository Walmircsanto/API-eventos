import 'reflect-metadata';
import statusEvento from "../typeorm/entities/enums/EventoStatus";
import AppError from "../../../shared/errors/AppError";
import IEventoRepository from "./interfaces/IEventoRepository";
import {inject, injectable} from "tsyringe";
import {EventoRepository} from "../typeorm/repositories/EventoRepository";
import EventoRequest from "../dto/EventoRequest";

interface IdRequest {
    id: number
}


@injectable() // indica que a nossa classe recebe a injeção de dependendica
class EventoService {

    private eventoRepository: IEventoRepository

    constructor(@inject('EventoRepository') eventoRepository: IEventoRepository) {
        this.eventoRepository = eventoRepository;
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


        const evento = await this.eventoRepository.findOne({where: {id: id}});

        if (!evento) {
            throw new AppError("Event not foud", "Bad request", 400);
        }

        return evento;


    }

}

export default EventoService;