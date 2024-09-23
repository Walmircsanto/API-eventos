import { Repository } from 'typeorm';
import Evento from "../entities/Eventos";

export  default class EventoRepository extends Repository<Evento> {

    public async findbyTitulo(titulo:string): Promise<Evento | null> {
        const evento = this.findOne({ where:{ titulo:titulo} });
        return evento;
    }
}