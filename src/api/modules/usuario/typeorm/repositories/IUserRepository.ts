import UserRequestDTO from "../../dto/UserRequestDTO";
import UserResponseDTO from "../../dto/UserResponseDTO";

export default interface IUserRepository{
    createUser(userRequest: UserRequestDTO):Promise<UserResponseDTO | undefined>
}