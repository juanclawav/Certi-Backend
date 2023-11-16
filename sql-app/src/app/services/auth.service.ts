
import {UserRepository} from "../../domain/interfaces/user.repository";
import {LoginDTO} from "../dtos/login.dto";
import {UserDto} from "../dtos/user.dto";
import {IUserEntity} from "../../domain/entities/IUserEntity";
import {User} from "../../domain/models/User.model";
import logger from "../../infrastructure/logger/logger";
import {EncryptImpl} from "../../infrastructure/utils/encrypt.jwt";
import bcrypt from "bcrypt";
import {ICacheService} from "../../domain/interfaces/IRedisCache";

export class AuthService {
    constructor(private userRepository: UserRepository, private encrypt: EncryptImpl, private redisCacheService: ICacheService) {
    }

    async getCache(){
        const USER_KEY = 'USER';
        const userID = 1;
        const ROLE_KEY = "ROLE";
        const roleID = 12343;
        const sol = await this.redisCacheService.get(`${USER_KEY}:${userID}`);
        console.log(sol);

    }
    async login(loginDTO: LoginDTO): Promise<UserDto> {
        const userEntity: Partial<IUserEntity> = {
            email: loginDTO.email,
            passwordHash: loginDTO.password
        };
        const user: User = await this.userRepository.findByEmail(userEntity.email);
        const USER_KEY = 'USER'
        this.redisCacheService.set(`${USER_KEY}:${user.id}`,JSON.stringify(user));
        if (!user) {
            logger.error('El usuario con el email: ${userEntity.email} no existe');
            throw Error('El email o password son incorrectos')
        }
        const validPassword = await bcrypt.compare(userEntity.passwordHash, user.passwordHash)
        if(!validPassword){
            logger.error('Contraseña incorrecta');
            throw Error('El email o password son incorrectos')
        }
        const token = this.encrypt.encrypt({userId: user.id})
        user.token = token;
        user.lastLogin = new Date();
        const userUpdated = await this.userRepository.updateUser(user.id,user);
        return {
            id: userUpdated.id,
            username: userUpdated.username,
            email: userUpdated.email,
            lastLogin: userUpdated.lastLogin,
            token: user.token
        };
    }
}