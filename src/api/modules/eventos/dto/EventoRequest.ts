import statusEvento from "../typeorm/entities/enums/EventoStatus";
import EventClassification from "../typeorm/entities/enums/EventClassification";


export default class EventoRequest {

    id?: number;

    titulo: string;

    img:string;

    numVagas:number;

    status: statusEvento;

    descricao:string

    classification: EventClassification

    dataInicio: Date;

    dataFim: Date;

    certificadoId: number | null

    usuariosIds: number[] | null
}