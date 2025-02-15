import {In, Repository} from 'typeorm';
import IEventoRepository from "../../services/interfaces/IEventoRepository";
import Evento from "../entities/Evento";
import {AppDataSource} from "../../../../shared/typeorm/data-source";
import EventoRequest from "../../dto/EventoRequest";
import {EventoMapper} from "../../mapper/EventoMapper";
import {injectable} from "tsyringe";
import statusEvento from "../entities/enums/EventoStatus";
import AppError from "../../../../shared/errors/AppError";
import Usuario from "../../../usuario/typeorm/entities/Usuario";


export interface IRequestEvento {
    id: number

    titulo: string;

    img: string;

    status: statusEvento;

    descricao: string

    usuarios: Usuario[]

    dataInicio: Date;

    dataFim: Date;
}

@injectable()
export default class EventoRepository implements IEventoRepository {

    // A Repository<> e uma classe do proprio TypeORM que permite acesso a banco de dados
    private ormRepository: Repository<Evento>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Evento);
    }

    public async createEvento({
                                  titulo,
                                  img,
                                  status,
                                  descricao,
                                  dataInicio,
                                  dataFim,
                                  numVagas,
                                  usuariosIds,
                                  certificadoId
                              }: EventoRequest): Promise<Evento> {

        const event =  await new EventoMapper().parserRequestInEvento({
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

        const evento = await this.ormRepository.save(event);

        return evento;
    }

    async deleteEvento(idEvent: number): Promise<void> {

        await this.ormRepository.delete(idEvent);
    }

    listEventos(): Promise<Evento[]> {
        return this.ormRepository.find();
    }

    async updateEvento(eventoRequest: Evento): Promise<Evento> {

        const evento = await this.ormRepository.findOne({
            where: {
                id: eventoRequest.id,
            }
        });
        if (evento) {
            evento.id = eventoRequest.id;
            evento.img = eventoRequest.img;
            evento.titulo = eventoRequest.titulo;
            evento.status = eventoRequest.status;
            evento.descricao = eventoRequest.descricao;
            evento.dataInicio = eventoRequest.dataInicio;
            evento.dataFim = eventoRequest.dataFim;
            evento.usuarios = eventoRequest.usuarios;

            await this.ormRepository.save(evento);
            return evento;
        } else {
            throw new AppError("Event not found", "Bad request", 400);
        }


    }


    async updateEventoEntity(eventoRequest: Evento): Promise<Evento> {

        const evento = await this.ormRepository.findOne({
            where: {
                id: eventoRequest.id,
            }
        });
        if (evento) {
            evento.id = eventoRequest.id;
            evento.img = eventoRequest.img;
            evento.titulo = eventoRequest.titulo;
            evento.status = eventoRequest.status;
            evento.descricao = eventoRequest.descricao;
            evento.dataInicio = eventoRequest.dataInicio;
            evento.dataFim = eventoRequest.dataFim;
            evento.usuarios = eventoRequest.usuarios
            await this.ormRepository.save(evento);
            return evento;
        } else {
            throw new AppError("Event not found", "Bad request", 400);
        }


    }

    async findEventoById(id: number): Promise<Evento | null> {
        const evento = await this.ormRepository.findOne({
            where: {
                id: id
            }
        });
        return evento;
    }

    async findEventosById( listId: number[]){
       const eventos = await this.ormRepository.findBy({
           id: In(listId)
       });

       return eventos
    }


    public async findEventsUser(idUser:number){
        return await this.ormRepository
            .createQueryBuilder('evento')
            .innerJoin('evento.usuarios', 'usuario')
            .where('usuario.id = :idUser', {idUser})
            .getMany()
    }

}