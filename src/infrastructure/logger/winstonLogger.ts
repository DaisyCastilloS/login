import winston from 'winston';
import { LoggerWrapperInterface } from '../interface/LoggerWrapperInterface';

export default class WinstonLogger implements LoggerWrapperInterface {
  private logLevels = {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7,
  };

  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      levels: this.logLevels,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        }),
      ],
    });
  }

  emerg(message: string): void {
    this.logger.emerg(message);
  }

  alert(message: string): void {
    this.logger.alert(message);
  }

  crit(message: string): void {
    this.logger.crit(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  warning(message: string): void {
    this.logger.warning(message);
  }

  notice(message: string): void {
    this.logger.notice(message);
  }

  info(message: string): void {
    this.logger.info(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}
