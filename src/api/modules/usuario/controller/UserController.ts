import {Request, Response} from 'express';
import {Column} from "typeorm";
import {inject, injectable} from "tsyringe";
import UserService from "../service/UserService";

@injectable()
export default class UserController {

    constructor(@inject(UserService) private readonly userService: UserService) {
    }

    public async creatUser(req: Request, res: Response) {
        const {idade, categoria, nome, email, password} = req.body

        const user = await this.userService.createUser({idade, categoria, nome, email, password});

        return res.status(201).json(user);


    }

    public async finByIdUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        const user = await this.userService.findUserById(id);

        return res.status(200).json(user);
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

    public async findAllUsers(req: Request, res: Response){

        const users = await this.userService.finAllUser();

        return res.status(200).json(users);
    }
}