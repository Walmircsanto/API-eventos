import {Request, Response} from 'express';
import {inject, injectable} from "tsyringe";
import UserService from "../service/UserService";
import EventSubscribe from "../service/EventSubscribe";
import {BlackListedRedisClient} from "../../../../index";

@injectable()
export default class UserController {

    constructor(@inject(UserService) private readonly userService: UserService,
                @inject(EventSubscribe) private readonly subscribeEvent: EventSubscribe) {
    }

    public async creatUser(req: Request, res: Response) {
        const {idade, categoria, nome, email, password} = req.body

        const user = await this.userService.createUser({idade, categoria, nome, email, password});

        return res.status(201).json(user);


    }

    public async finByIdUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const idUser = parseInt(req.body.userId);

        if (id === idUser) {
            const user = await this.userService.findUserById(id);
            return res.status(200).json(user);
        } else {
            return res.status(401).json("Unautorized")
        }


    }

    public async deleteUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        await this.userService.deleteUser(id);

        return res.status(204).json("");
    }

    public async updateUser(req: Request, res: Response) {
        const {id, idade, categoria, nome, email, password} = req.body

        const user = await this.userService.updateUser({id, idade, categoria, nome, email, password});

        return res.status(204).json("");
    }

    public async findAllUsers(req: Request, res: Response) {

        const users = await this.userService.finAllUser();

        return res.status(200).json(users);
    }

    public async sessionUser(req: Request, res: Response) {
        const {email, password} = req.body;
        const tokenUser = await this.userService.sessionUser(email);

        return res.status(200).json(tokenUser);
    }

    public async subEvent(req: Request, res: Response) {
        const idUser = parseInt(req.body.userId);
        const idEvent = parseInt(req.params.idEvent);
        const id = parseInt(req.params.id);

        if (id === idUser) {
            const evento = await this.subscribeEvent.subscribeEvent(idEvent, idUser);

            await BlackListedRedisClient.hSet('eventos',{
                'id': evento.id.toString(),
                'titulo': evento.titulo,
                'img': evento.img,
                'status': evento.status.toString(),
                'descricao': evento.descricao,
                'dataInicio': evento.dataInicio.toUTCString(),
                'dataFim': evento.dataFim.toUTCString()
            })

            const testGet = await BlackListedRedisClient.hGetAll('eventos')
            console.log(testGet)
            return res.json(evento).status(200);
        } else {
            return res.json('Unauthorized').status(401)
        }

    }
}