import {
    Column,
    CreateDateColumn,
    Entity, JoinTable, ManyToMany,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import statusEvento from "./enums/EventoStatus";
import Usuario from "../../../usuario/typeorm/entities/Usuario";
import EventoStatus from "./enums/EventoStatus";
import Certificado from "../../../certificado/typeorm/entities/Certificado";

@Entity()
class Evento {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    titulo: string;


    @Column()
    img:string;

    @Column({
        type: "enum",
        enum: statusEvento,
        default: statusEvento.ABERTO
    })
    status: statusEvento;

    @Column()
    descricao:string

    @Column()
    dataInicio: Date;

    @Column()
    dataFim: Date;

    @OneToOne(() => Certificado)
    certificado: Certificado

    @ManyToMany(() => Usuario, { onDelete: 'CASCADE' })
    @JoinTable()
    usuarios: Usuario[]

    @CreateDateColumn()
    @Exclude()
    created_at: Date;

    @UpdateDateColumn()
    @Exclude()
    updated_at: Date;
}

export default  Evento;