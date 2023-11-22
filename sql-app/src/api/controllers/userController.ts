import { Request, Response, Router } from 'express';
import { UserService } from '../../app/services/user.service';
import {UserDto} from "../../app/dtos/user.dto";
import {CreateUserDTO} from "../../app/dtos/create.user.dto";
import logger from "../../infrastructure/logger/logger";
import {verifyTokenMiddleware} from "./middleware/verifyToken";

export class UserController {
    public router: Router;
    private userService: UserService;


    constructor(userService: UserService) {
        this.userService = userService;
        this.router = Router();
        this.routes();
    }
    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     summary: Get a user by ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the user
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Successful response with user data
     *       404:
     *         description: User not found
     */
    public async getUserById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const userDto = await this.userService.getUserById(id);

        if (!userDto) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(userDto);
    }
    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Create a new user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateUserDTO'
     *     responses:
     *       201:
     *         description: User created successfully
     *       400:
     *         description: Bad request, invalid input
     */
    public async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const userDto: CreateUserDTO = req.body;
            const user = await this.userService.createUser(userDto);
            return res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                return res.status(400).json({ message: error.message });
            }
            return res.status(400).json({ message: error });

        }
    }
    /**
     * @swagger
     * /users/{userId}:
     *   delete:
     *     summary: Delete a user by ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: userId
     *         required: true
     *         description: ID of the user to delete
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: User deleted successfully
     *       500:
     *         description: Internal server error
     */
    public async deleteUser(req: Request, res: Response): Promise<Response> {
        const { userId } = req.params;
        try {
            logger.debug(`Intentando eliminar al usuario con ID: ${userId}`);
            await this.userService.deleteUser(userId);
            logger.info(`Usuario con ID: ${userId} eliminado con éxito`);
            return res.status(200).json({ message: 'Usuario eliminado con éxito' });
        } catch (error) {
            logger.error(`Error al eliminar al usuario con ID: ${userId}. Error: ${error}`);
            return res.status(500).json({ message: error });
        }
    }
    /**
     * @swagger
     * /users/{userId}:
     *   put:
     *     summary: Update a user by ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: userId
     *         required: true
     *         description: ID of the user to update
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *     responses:
     *       200:
     *         description: User updated successfully
     *       500:
     *         description: Internal server error
     */
    public async updateUser(req: Request, res: Response): Promise<Response> {
        const { userId } = req.params;
        const updateData = req.body;
        try {
            logger.debug(`Intentando actualizar al usuario con ID: ${userId}`);
            const updatedUser = await this.userService.updateUser(userId, updateData);
            logger.info(`Usuario con ID: ${userId} actualizado con éxito`);
            return res.status(200).json({ user: updatedUser });
        } catch (error) {
            logger.error(`Error al actualizar al usuario con ID: ${userId}. Error: ${error}`);
            return res.status(500).json({ message: 'Error al actualizar el usuario' });
        }
    };

    public routes() {
        this.router.get('/:id',verifyTokenMiddleware, this.getUserById.bind(this));
        this.router.post('/', this.createUser.bind(this));
        this.router.delete('/:userId', this.deleteUser.bind(this));
        this.router.put('/:userId', this.updateUser.bind(this));
    }
}