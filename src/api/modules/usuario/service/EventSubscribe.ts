import {inject, injectable} from "tsyringe";
import UserService from "./UserService";
import {EventoService} from "../../eventos/services/EventoService";
import AppError from "@modules/errors/AppError";
import EventoRepository from "../../eventos/typeorm/repositories/EventoRepository";
import send from "../../email/service/SendEmail";


@injectable()
export default class EventSubscribe {

    constructor(@inject(UserService) private userService: UserService,
                @inject(EventoRepository) private eventoRepository: EventoRepository) {
    }

    //Da pra verificar se o usuario esta logado, para isso podemos usar o redis para armazenar a sessão do nosso user
    public async subscribeEvent(idEvent: number, idUser: number) {
        //busco um usuario pelo ID
        const user = await this.userService.findUserById(idUser);
        //busco um evento pelo ID
        const event = await this.eventoRepository.findEventoById(idEvent)
        if(!event) throw  new AppError("Event Not found", "Bad Request")

        if(!user) throw  new AppError("User Not Found", "Bad Request")

        if (event.numVagas > 0) {
            event.usuarios = event.usuarios || [];
            event.usuarios.push(user);
            event.numVagas--;

            const evento =  await this.eventoRepository.updateEventoEntity(event);

            return evento
        } else {
            throw new AppError("Não há vagas disponíveis", "bad_request");
        }


    }
}