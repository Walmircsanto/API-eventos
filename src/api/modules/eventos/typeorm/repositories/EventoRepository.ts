import {EntityRepository, Repository} from 'typeorm';
import {DataSource} from "typeorm";


// @EntityRepository(Evento)
// export  default class EventoRepository extends Repository<Evento> {
//
//     public async findbyTitulo(titulo:string): Promise<Evento | null> {
//         const evento = this.findOne({ where:{ titulo:titulo} });
//         return evento;
//     }
// }