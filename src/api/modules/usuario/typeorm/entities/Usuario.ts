import {
    Column,
    CreateDateColumn,
    Entity, JoinTable, ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Evento from "../../../eventos/entities/Eventos";

@Entity()
class Usuario{

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    idade:number;

    @Column()
    categoria:string;

    @Column()
    nome:string;

    @Column()
    email:string;

    @CreateDateColumn()
    @Exclude()
    created_at: Date;

    @UpdateDateColumn()
    @Exclude()
    updated_at: Date;
}

export default Usuario