import EventoRequest from "../dto/EventoRequest";
import Evento from "../typeorm/entities/Evento";
import Usuario from "../../usuario/typeorm/entities/Usuario";
import Certificado from "../../certificado/typeorm/entities/Certificado";

export class EventoMapper {

    public  static  parserRequestInEvento(eventRequest: EventoRequest){
        const evento = new Evento();
        evento.img =eventRequest.img;
        evento.titulo = eventRequest.titulo;
        evento.descricao = eventRequest.descricao;
        evento.descricao = eventRequest.descricao;
        evento.dataInicio = eventRequest.dataInicio
        evento.dataFim = eventRequest.dataFim
        evento.certificado = null
        evento.usuarios = null

        return evento
    }

    public lisMocksUsuario(usuario:number[]){

        const usuarios = <Usuario[]> [];

        for(let i = 1; i < usuarios.length; i++){
            const user = new Usuario();
            user.id = i;

            usuarios.push(user);
        }

        return usuario
    }

}