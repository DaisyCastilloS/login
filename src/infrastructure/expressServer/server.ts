import express, {
  Express, Request, Response, NextFunction,
} from 'express';
import cors from 'cors';
import { ServerWrapperInterface } from '../interface/ServerWrapperInterface';
import { LoggerWrapperInterface } from '../interface/LoggerWrapperInterface';
import routes from './routes/index.routes';
import errorHandler from '../middlewares/ErrorHandlerMiddleware';

export default class ExpressServer implements ServerWrapperInterface {
  private server: Express;

  private logger: LoggerWrapperInterface;

  constructor(logger: LoggerWrapperInterface) {
    this.server = express();
    this.logger = logger;

    this.server.use(cors());
    this.server.use(express.json());
    this.server.use((req: Request, res: Response, next: NextFunction) => {
      this.logger.info(`Method ${req.method}, to endpoint ${req.url}`);
      next();
    });

    // Ruta raíz
    this.server.get('/', (req: Request, res: Response) => {
      res.send('Hello, world');
    });

    // Rutas de la API
    this.server.use('/api', routes);

    // Middleware de manejo de errores
    this.server.use(errorHandler(this.logger));
  }

  start(port: number): void {
    this.server.listen(port, () => {
      this.logger.info(`Running on port ${port}`);
    });
  }
}
