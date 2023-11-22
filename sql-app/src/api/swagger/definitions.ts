/**
 * @swagger
 * components:
 *   schemas:
 *     LoginCredentials:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         username: "usuario_ejemplo"
 *         password: "contraseña123"
 *     UserDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the user.
 *           example: "1"
 *         username:
 *           type: string
 *           description: The username of the user.
 *           example: "john_doe"
 *         email:
 *           type: string
 *           description: The email address of the user.
 *           example: "john.doe@example.com"
 *         lastLogin:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: The last login timestamp of the user (nullable).
 *           example: "2023-01-01T12:00:00Z"
 *         token:
 *           type: string
 *           nullable: true
 *           description: The authentication token associated with the user (nullable).
 *           example: "aBcDeFgHiJkLmNoPqRsTuVwXyZ"
 *       example:
 *         id: "1"
 *         username: "john_doe"
 *         email: "john.doe@example.com"
 *         lastLogin: "2023-01-01T12:00:00Z"
 *         token: "aBcDeFgHiJkLmNoPqRsTuVwXyZ"
 *
 *     CreateUserDTO:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username for the new user.
 *           example: "new_user"
 *         email:
 *           type: string
 *           description: The email address for the new user.
 *           example: "new.user@example.com"
 *         password:
 *           type: string
 *           description: The password for the new user.
 *           example: "password123"
 *         roleId:
 *           type: string
 *           description: The role ID for the new user.
 *           example: "2"
 *       example:
 *         username: "new_user"
 *         email: "new.user@example.com"
 *         password: "password123"
 *         roleId: "2"
 */