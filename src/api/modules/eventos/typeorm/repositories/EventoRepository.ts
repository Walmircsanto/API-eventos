
import {Repository} from 'typeorm';
import IEventoRepository from "../../services/interfaces/IEventoRepository";
import Evento from "../entities/Evento";
import {AppDataSource} from "../../../../shared/typeorm/data-source";
import EventoRequest from "../../dto/EventoRequest";
import {EventoMapper} from "../../mapper/EventoMapper";
import evento from "../entities/Evento";
import {injectable} from "tsyringe";

@injectable()
export class EventoRepository implements IEventoRepository {

    // A Repository<> e uma classe do proprio TypeORM que permite acesso a banco de dados
    private ormRepository: Repository<Evento>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Evento);
    }

    public async createEvento({ titulo, img, status, descricao, dataInicio, dataFim, usuariosIds, certificadoId}: EventoRequest): Promise<Evento> {

        const event = EventoMapper.parserRequestInEvento({ titulo, img, status, descricao, dataInicio, dataFim, usuariosIds, certificadoId});

        const evento = await this.ormRepository.save(event);

        return evento;
    }

    deleteEvento(idEvento: number): void {
    }

    listEventos(): Promise<Evento[]> {
        return this.ormRepository.find();
    }

    updateEvento(evento: EventoRequest): Promise<Evento> {
      throw new Error("Error");
        // return null
    }

      async findEventoById(id: number): Promise<Evento | null> {
     const evento =  await this.ormRepository.findOne({
         where:{
             id: id
         }
     });
     return evento;
    }

}