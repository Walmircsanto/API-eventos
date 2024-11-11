import UserRequestDTO from "../dto/UserRequestDTO";
import Usuario from "../typeorm/entities/Usuario";

export default class UserMapper {

    public static parseRequestDTOInUserEntity(userDTO: UserRequestDTO) {
        const user = new Usuario();
        user.nome = userDTO.nome;
        user.categoria = userDTO.categoria;
        user.idade = userDTO.idade;
        user.email = userDTO.email;
        user.password = userDTO.password;

        return user;
    }
}