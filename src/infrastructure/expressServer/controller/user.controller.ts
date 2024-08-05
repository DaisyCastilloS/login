import { Request, Response, NextFunction } from 'express';
import { StatusCodes as code } from 'http-status-codes';
import UserService from '../../../services/interfaces/UserService';
import createUser from '../../../domain/entity/UserFactory'; // Ajusta la ruta según tu estructura de proyecto
import { LoggerWrapperInterface } from '../../interface/LoggerWrapperInterface';
import { AuthenticatedRequest } from '../../interface/AuthenticatedRequest'; // Ajusta la ruta según tu estructura de proyecto

export default class UserController {
  private logger: LoggerWrapperInterface;
  private userService: UserService;

  constructor(logger: LoggerWrapperInterface, userService: UserService) {
    this.logger = logger;
    this.userService = userService;
  }

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, lastname, email, password, roles } = req.body;

    try {
      const user = createUser(name, lastname, email, password, roles);
      await this.userService.registerUser(user);
      res.status(code.CREATED).json({ message: 'User registered successfully' });
    } catch (error: unknown) {
      this.logger.error(`Error registering user: ${error instanceof Error ? error.message : String(error)}`);
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    try {
      const token = await this.userService.loginUser(email, password);
      res.status(code.OK).json({ token });
    } catch (error: unknown) {
      this.logger.error(`Error logging in: ${error instanceof Error ? error.message : String(error)}`);
      next(error);
    }
  }

  async logout(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        await this.userService.logoutUser(token);
        res.status(code.OK).json({ message: 'User logged out successfully' });
      } else {
        res.status(code.BAD_REQUEST).json({ message: 'No token provided' });
      }
    } catch (error: unknown) {
      this.logger.error(`Error logging out: ${error instanceof Error ? error.message : String(error)}`);
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.params.id;

    try {
      const user = await this.userService.findUserById(userId);
      if (user) {
        res.status(code.OK).json(user);
      } else {
        res.status(code.NOT_FOUND).json({ message: 'User not found' });
      }
    } catch (error: unknown) {
      this.logger.error(`Error fetching user by ID: ${error instanceof Error ? error.message : String(error)}`);
      next(error);
    }
  }

  async getUserByEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    const email = req.params.email;

    try {
      const user = await this.userService.findUserByEmail(email);
      if (user) {
        // Filtra los campos necesarios
        const { name, lastname, email } = user;
        res.status(code.OK).json({ name, lastname, email });
      } else {
        res.status(code.NOT_FOUND).json({ message: 'User not found' });
      }
    } catch (error: unknown) {
      this.logger.error(`Error fetching user by email: ${error instanceof Error ? error.message : String(error)}`);
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.userService.findAllUsers();
      if (users) {
        res.status(code.OK).json(users);
      } else {
        res.status(code.NOT_FOUND).json({ message: 'No users found' });
      }
    } catch (error: unknown) {
      this.logger.error(`Error fetching all users: ${error instanceof Error ? error.message : String(error)}`);
      next(error);
    }
  }
}
