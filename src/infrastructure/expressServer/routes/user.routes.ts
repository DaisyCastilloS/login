import express, { Router, Request, Response } from 'express';
import UserController from '../controller/user.controller';
import PGDataSourceService from '../../../services/PGDataSourceServiceUser';
import UserService from '../../../services/interfaces/UserService';
import { SQLDatabaseWrapperInterface } from '../../interface/SQLDatabaseWrapperInterface'; // Import as a type
import RedisTokenRevocationList from '../../security/RedisTokenRevocation';
import authenticateJWT from '../../middlewares/authenticateJWT';
import SQLDatabase from '../../db/PGConfig'; // Import implementation
import WinstonLogger from '../../logger/winstonLogger';

const UserRoutes: Router = express.Router();
const dbWrapper: SQLDatabaseWrapperInterface = SQLDatabase.getInstance(); // Use singleton instance
const userRepository = new PGDataSourceService(dbWrapper);
const tokenRevocationList = new RedisTokenRevocationList();
const userService = new UserService(userRepository, tokenRevocationList);
const logger = new WinstonLogger();
const userController = new UserController(logger,userService);


// Registro de usuario
UserRoutes.post('/register', (req, res, next) => userController.register(req, res, next));

// Inicio de sesión de usuario
UserRoutes.post('/login', (req, res, next) => userController.login(req, res, next));

// Cierre de sesión de usuario
UserRoutes.post('/logout', authenticateJWT(tokenRevocationList), (req, res, next) => userController.logout(req, res, next));

// Obtener usuario por ID
UserRoutes.get('/:id', authenticateJWT(tokenRevocationList), (req, res, next) => userController.getUserById(req, res, next));

// Obtener usuario por email
UserRoutes.get('/email/:email', authenticateJWT(tokenRevocationList), (req, res, next) => userController.getUserByEmail(req, res, next));

// Obtener todos los usuarios
UserRoutes.get('/users', authenticateJWT(tokenRevocationList), (req, res, next) => userController.getAllUsers(req, res, next));

export default UserRoutes;