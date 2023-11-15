import bcrypt from "bcrypt";
import { UserRepository } from "../../domain/interfaces/user.repository";
import { UserEntity } from "../entities/user.entity";
import { AppDataSource } from "../config/dataSource";
import { User } from "../../domain/models/User.model";
import logger from "../logger/logger";
import { RoleEntity } from "../entities/role.entity";
export class UserRepositoryImpl implements UserRepository {
    async findById(id: string): Promise<User | null> {
        logger.info('Alguna información relevante');
        const userRepository = AppDataSource.getRepository(UserEntity);
        const user = await userRepository.findOne({
            where: { id },
            relations: ['role']
        });
        return user ? new User(user) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const userRepository = AppDataSource.getRepository(UserEntity);
        const user = await userRepository.findOne({
            where: { email },
            relations: ['role']
        });
        return user ? new User(user) : null;
    }

    async createUser(user: User): Promise<User> {
        const userRepository = AppDataSource.getRepository(UserEntity);

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.passwordHash, salt);
        const userEntity = userRepository.create({
            username: user.username,
            email: user.email,
            passwordHash: hash,
            createdAt: user.createdAt || new Date(),
            lastLogin: user.lastLogin || null,
            role: user.role
        });

        const userResponse = await userRepository.save(userEntity);

        return new User({
            id: userResponse.id,
            username: userResponse.username,
            email: userResponse.email,
            passwordHash: userResponse.passwordHash,
            createdAt: userResponse.createdAt,
            lastLogin: userResponse.lastLogin,
            role: userResponse.role
        });
    }

    async deleteUser(id: string): Promise<void> {

        const repository = AppDataSource.getRepository(UserEntity);
        const user = await repository.findOneBy({ id });

        if (!user) {
            logger.error(`UserRepository: Error al eliminar al usuario con ID: ${id}.`);
            throw new Error('Usuario no encontrado');
        }

        await repository.remove(user);
    }

    async updateUser(id: string, updateData: Partial<User>): Promise<User> {
        const repository = AppDataSource.getRepository(UserEntity);
        const user = await repository.findOneBy({ id });

        if (!user) {
            logger.error(`UserRepository: Error al modificar al usuario con ID: ${id}.`);
            throw new Error('Usuario no encontrado');
        }

        // if (user.role.id !== updateData.roleId)
        // get role a partir del updateData.roleId
        // if (!role)
        // user.role = role

        repository.merge(user, updateData);
        const updatedUser = await repository.save(user);
        return updatedUser;
    }
}