import 'reflect-metadata';
import AppError from "../../../shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import EventoRepository from "../typeorm/repositories/EventoRepository";
import EventoRequest from "../dto/EventoRequest";
import {EventoMapper} from "../mapper/EventoMapper";
import Evento from "../typeorm/entities/Evento";


interface IRequestIMGEvent {
    id: number,
    imgFileName: string
}


@injectable() // indica que a nossa classe recebe a injeção de dependencia
export class EventoService {

    constructor(@inject(EventoRepository) private readonly eventoRepository: EventoRepository) {
    }

    public async createEvent({
                                 titulo,
                                 img,
                                 status,
                                 descricao,
                                 dataInicio,
                                 dataFim,
                                 numVagas,
                                 usuariosIds,
                                 certificadoId
                             }: EventoRequest) {

        const evento = await this.eventoRepository.createEvento(
            {
                titulo,
                img,
                status,
                descricao,
                dataInicio,
                dataFim,
                numVagas,
                usuariosIds,
                certificadoId
            });
        return evento;
    }


    public async findById(id: number) {


        const evento = await this.eventoRepository.findEventoById(id);

        if (!evento) {
            throw new AppError("Event not foud", "Bad request", 400);
        }

        return evento;


    }

    public async findAllEventos() {
        const eventos = await this.eventoRepository.listEventos();

        return eventos;
    }

    public async createAvatarService({id, imgFileName}: IRequestIMGEvent) {
        const evento = await this.findById(id);

        if (!evento) {
            throw new AppError("Evento not found", "Bad request", 400);
        }

        evento.img = imgFileName;
        await this.eventoRepository.updateEvento(evento);

        return evento;
    }

    public async deleteEvento(id: number): Promise<void> {
        const event = await this.findById(id);

        if (!event) {
            throw new AppError("Evento not found", "Bad request", 400);
        }
        await this.eventoRepository.deleteEvento(id);

    }

    public async updateEvento(eventRequest: EventoRequest) {

        const eventId = eventRequest.id;
        if (eventId) {
            const event = await this.eventoRepository.findEventoById(eventId);

            if (event) {

                return this.eventoRepository.updateEvento(event)
            }
        }

    }

    public async updateEventoEntity(eventRequest: Evento) {

        const eventId = eventRequest.id;
        if (eventId) {
            const event = await this.eventoRepository.findEventoById(eventId);

            if (event) {

                return this.eventoRepository.updateEventoEntity(event)
            }
        }

    }

}

