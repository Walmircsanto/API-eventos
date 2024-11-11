import 'reflect-metadata';
import IUserRepository from "./IUserRepository";
import {injectable} from "tsyringe";
import Usuario from "../entities/Usuario";
import {Repository} from "typeorm";
import {AppDataSource} from "../../../../shared/typeorm/data-source";
import AppError from "../../../../shared/errors/AppError";

@injectable() // significa que minha classe pode ser injetavel em outras classes
export default class UsersRepository implements IUserRepository {

    private ormRepository: Repository<Usuario>

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Usuario)
    }

    async createUser(user: Usuario): Promise<Usuario | undefined> {
        return this.ormRepository.save(user);
    }

    async deleteUser(id: number): Promise<void> {

        await this.ormRepository.delete(id);
    }

    async finAllUsers(): Promise<Usuario[] | null> {
        return await this.ormRepository.find();
    }

    async findUserById(id: number): Promise<Usuario | null> {
        const user = await this.ormRepository.findOne({
            where: {
                id: id
            }
        });

        return user
    }

    async updateUser(user: Usuario): Promise<Usuario | undefined> {
        const userInstance = await this.ormRepository.findOne({
            where: {
                id: user.id
            }
        });
        if (!userInstance) {
            throw new AppError("User not found in database", "Bad request", 400);

        }
         return  await this.ormRepository.save(user);


    }

    public async existEmail(email: string) {
        console.log(email)
        const user = await this.ormRepository.findOne({
            where: {
                email: email,
            },
        });

        return user;
    }

}