import {inject, injectable} from "tsyringe";
import UserService from "./UserService";
import {EventoService} from "../../eventos/services/EventoService";


@injectable()
export default class EventSubscribe {

    constructor(@inject(UserService) private userService: UserService,
                @inject(EventoService) private eventService: EventoService) {
    }

    //Da pra verificar se o usuario esta logado, para isso podemos usar o redis para armazenar a sessão do nosso user
    public async subscribeEvent(idEvent: number, idUser:number) {
     const user = await this.userService.findUserById(idUser);
     const event = await this.eventService.findById(idEvent)

        if(event.numVagas > 0){
         event.usuarios?.push(user);
         this.eventService.
        }

    }
}