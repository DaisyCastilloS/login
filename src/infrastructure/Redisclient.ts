import Redis from 'ioredis';
import logger from './logger/index'; // Asegúrate de que la ruta es correcta

const redis = new Redis({
  host: process.env.REDIS_HOST || 'redis',
  port: Number(process.env.REDIS_PORT) || 6379,
});

redis.on('error', (err) => {
  logger.error(`Redis error: ${err}`); // Usar logger.error en lugar de console.error
});

export default redis;
