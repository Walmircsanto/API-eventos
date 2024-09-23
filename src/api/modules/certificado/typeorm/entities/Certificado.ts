import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, JoinTable,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Evento from "../../../eventos/entities/Eventos";

@Entity()
class Certificado {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    assinatura:string;

    @OneToOne(() => Evento)
    @JoinColumn()
    evento:Evento;

    @Column()
    img:string;

    @CreateDateColumn()
    @Exclude()
    created_at: Date;

    @UpdateDateColumn()
    @Exclude()
    updated_at: Date;
}
export default Certificado;