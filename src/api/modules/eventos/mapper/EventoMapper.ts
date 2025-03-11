import EventoRequest from "../dto/EventoRequest";
import Evento from "../typeorm/entities/Evento";
import Usuario from "../../usuario/typeorm/entities/Usuario";
import UserService from "../../usuario/service/UserService";
import EventoResponse from "../dto/EventResponse";
import evento from "../typeorm/entities/Evento";

export class EventoMapper {

    private userService: UserService;

    public async parserRequestInEvento(eventRequest: EventoRequest) {
        const evento = new Evento();
        evento.id = <number>eventRequest.id;
        evento.img = eventRequest.img;
        evento.titulo = eventRequest.titulo;
        evento.descricao = eventRequest.descricao;
        evento.descricao = eventRequest.descricao;
        evento.dataInicio = eventRequest.dataInicio
        evento.dataFim = eventRequest.dataFim
        evento.numVagas = eventRequest.numVagas
        evento.classification = eventRequest.classification
        evento.certificado = null

        if (eventRequest.usuariosIds?.length) {
            for (let i = 0; i < eventRequest.usuariosIds?.length; i++) {
                evento.usuarios = evento.usuarios || [];
                evento.usuarios.push( await this.userService.findUserById(i));
            }
        } else{
            evento.usuarios = null;
        }


        return evento
    }



    public parseEntityToDTO(evento:Evento){
        const eventoResponse = new EventoResponse;
        eventoResponse.id = evento.id;
        eventoResponse.img = evento.img;
        eventoResponse.titulo = evento.titulo;
        eventoResponse.descricao = evento.descricao;
        eventoResponse.dataInicio = evento.dataInicio;
        eventoResponse.dataFim = evento.dataFim;
        eventoResponse.numVagas = evento.numVagas;

        return eventoResponse;
    }

    public async parserEntityToRequestDTO(event: Evento){
        const eventoRequest = new EventoRequest();
        eventoRequest.id = <number>event.id;
        eventoRequest.img = event.img;
        eventoRequest.titulo = event.titulo;
        eventoRequest.descricao = event.descricao;
        eventoRequest.dataInicio = event.dataInicio
        eventoRequest.dataFim = event.dataFim
        eventoRequest.numVagas = event.numVagas
        eventoRequest.classification = event.classification

        if (event.usuarios?.length != null) {
            for (let i = 0; i < event.usuarios?.length; i++) {
                eventoRequest.usuariosIds = eventoRequest.usuariosIds || [];
                eventoRequest.usuariosIds.push( <number>event.usuarios[i].id);
            }
        } else{
            eventoRequest.usuariosIds = null;
        }


        return eventoRequest
    }

}