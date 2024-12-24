import {inject, injectable} from "tsyringe";
import UsersRepository from "../typeorm/repositories/UserRepository";
import UserRequestDTO from "../dto/UserRequestDTO";
import UserMapper from "../mapper/UserMapper";
import AppError from "@modules/errors/AppError";
import {sign} from "jsonwebtoken";
import {auth} from "@config/Auth";
import IRequestauthenticateUser from "../dto/IRequestAuthenticateDTO";

interface IRequestAuthenticateUser {
    email: string
    password: string
}

@injectable()
export default class UserService {

    // definimos como read only para ser imutavel.
    constructor(@inject(UsersRepository) private readonly usersRepository: UsersRepository) {

    }

    public async createUser(userRequest: UserRequestDTO) {

        const emailExist = await this.usersRepository.existEmail(userRequest.email)


        if (emailExist) {
            throw new AppError("Email already exist", "Bad Request");
        }
        const user = await this.usersRepository.createUser(UserMapper.parseRequestDTOInUserEntity(userRequest));

        return user;
    }


    public async findUserById(id: number) {
        const user = await this.usersRepository.findUserById(id);


        if (!user) {
            throw new AppError("User not found", "Bad request");
        }

        return user;
    }

    public async deleteUser(id: number) {
        const user = this.usersRepository.findUserById(id);

        if (!user) {
            throw new AppError("User not found", "Bad request");
        }
        await this.usersRepository.deleteUser(id);
    }

    public async updateUser(userRequest: UserRequestDTO) {
        const idUser = userRequest.id;
        if (idUser) {
            const user = await this.usersRepository.findUserById(idUser);

            console.log(user)
            if (user != null) {

                user.id = idUser;
                user.nome = userRequest.nome;
                user.email = userRequest.email;
                user.password = userRequest.password;
                user.idade = userRequest.idade;
                user.categoria = userRequest.categoria;
                return await this.usersRepository.updateUser(user);

            }
            throw new AppError("User not found", "Bad request");


        }
    }

    public async finAllUser() {
        const users = await this.usersRepository.finAllUsers();
        if (!users) {
            throw new AppError("List Users not found", "Bad request");
        }
        return users;
    }


    public async sessionUser({email, password}: IRequestauthenticateUser) {
        const user = await this.usersRepository.existEmail(email)

        if (user) {
            const id = user.id.toString();

            const token = sign({id}, auth.secret, {
                expiresIn: auth.expiresIn
            });

            return {
                user,
                token
            }
        }

    }

}