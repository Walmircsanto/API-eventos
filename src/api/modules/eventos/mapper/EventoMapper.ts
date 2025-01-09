import EventoRequest from "../dto/EventoRequest";
import Evento from "../typeorm/entities/Evento";
import Usuario from "../../usuario/typeorm/entities/Usuario";
import UserService from "../../usuario/service/UserService";
import EventoResponse from "../dto/EventResponse";

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
        evento.certificado = null

        if (eventRequest.usuariosIds?.length) {
            for (let i = 1; i < eventRequest.usuariosIds?.length; i++) {
                evento.usuarios?.push( await this.userService.findUserById(i));
            }
        } else{
            evento.usuarios = null;
        }


        return evento
    }

    public lisMocksUsuario(usuario: number[]) {

        const usuarios = <Usuario[]>[];

        for (let i = 1; i < usuarios.length; i++) {
            const user = new Usuario();
            user.id = i;

            usuarios.push(user);
        }

        return usuario
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

}