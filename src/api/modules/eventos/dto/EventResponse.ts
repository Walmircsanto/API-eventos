import statusEvento from "../typeorm/entities/enums/EventoStatus";


export default class EventoResponse {

    id: number;

    titulo: string;

    img:string;

    numVagas: number;

    status: statusEvento;

    descricao:string

    dataInicio: Date;

    dataFim: Date;

}