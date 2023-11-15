import { UserRepository } from "../../domain/interfaces/user.repository";
import { UserDto } from '../dtos/user.dto';
import {CreateUserDTO} from "../dtos/create.user.dto";
import {User} from "../../domain/models/User.model";
import {IUserEntity} from "../../domain/entities/IUserEntity";

export class UserService {
    constructor(private userRepository: UserRepository) { }

    async getUserById(id: string): Promise<UserDto | null> {
        const user = await this.userRepository.findById(id);
        if (!user) return null;
        return {

            id: user.id,
            username: user.username,
            email: user.email,
            lastLogin: user.lastLogin
        };
    }
    async createUser(userDto: CreateUserDTO): Promise<User> {
        const userEntity: IUserEntity = {
            username: userDto.username,
            email: userDto.email,
            passwordHash: '123123', //userDto.password,
            roleId: 'admin', // userDto.roleId
            createdAt: new Date(),
            lastLogin: null,
        };
        const newUser = new User(userEntity);
        return this.userRepository.createUser(newUser);
    }
}
