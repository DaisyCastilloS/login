import ExpressServer from './infrastructure/expressServer/server';
import WinstonLogger from './infrastructure/logger/winstonLogger';

require('dotenv').config();

const logger = new WinstonLogger();
const server = new ExpressServer(logger);

const PORT = Number(process.env.SERVER_PORT) || 4040;
server.start(PORT);
