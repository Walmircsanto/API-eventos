import statusEvento from "../typeorm/entities/enums/EventoStatus";
import Certificado from "../../certificado/typeorm/entities/Certificado";
import Usuario from "../../usuario/typeorm/entities/Usuario";

export default interface IEventoRequest{
    id: number;

    titulo: string;

    img:string;

    status: statusEvento;

    descricao:string

    dataInicio: Date;

    dataFim: Date;

    certificadoId: number

    usuariosIds: number[]
}