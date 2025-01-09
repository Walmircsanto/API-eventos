import statusEvento from "../typeorm/entities/enums/EventoStatus";


export default class EventoRequest {

    id?: number;

    titulo: string;

    img:string;

    numVagas:number;

    status: statusEvento;

    descricao:string

    dataInicio: Date;

    dataFim: Date;

    certificadoId: number | null

    usuariosIds: number[] | null
}