import UserRequestDTO from "../../dto/UserRequestDTO";
import UserResponseDTO from "../../dto/UserResponseDTO";
import Usuario from "../entities/Usuario";

export default interface IUserRepository{
    createUser(userRequest: Usuario):Promise<Usuario | undefined>
    updateUser(userRequest: Usuario): Promise<Usuario | undefined>
    deleteUser(id:number): Promise<void>
    findUserById(id:number): Promise<Usuario | null>
    finAllUsers():Promise<Usuario[] | null>
}