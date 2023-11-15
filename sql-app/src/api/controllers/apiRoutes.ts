import {RoleRepositoryImpl} from "../../infrastructure/repositories/role.repository";
import {RoleService} from "../../app/services/role.service";
import {RoleController} from "./roleController";
import {UserRepositoryImpl} from "../../infrastructure/repositories/user.repository";
import {UserService} from "../../app/services/user.service";
import {UserController} from "./userController";
import {AuthService} from "../../app/services/auth.service";
import {AuthController} from "./authController";
import {Router} from "express";
import {EncryptImpl} from "../../infrastructure/utils/encrypt.jwt";

const encrypt = new EncryptImpl();
const roleRepository = new RoleRepositoryImpl();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);
const userRepository = new UserRepositoryImpl();
const userService = new UserService(userRepository, roleRepository);
const userController = new UserController(userService);
const authService = new AuthService(userRepository, encrypt);
const authController = new AuthController(authService);

export function apiRoutes(): Router {
    const router = Router();

    router.use('/users', userController.router);
    router.use('/roles', roleController.router);
    router.use('/auth', authController.router);

    return router;
}