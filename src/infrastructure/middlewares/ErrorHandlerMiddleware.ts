import { Request, Response, NextFunction } from 'express';
import { StatusCodes as code } from 'http-status-codes';
import { LoggerWrapperInterface } from '../interface/LoggerWrapperInterface';

const errorHandler = (logger: LoggerWrapperInterface) => (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorMessage = err instanceof Error ? err.message : String(err);

  // Registrar el error usando Winston
  logger.error(`Error: ${errorMessage}`);

  res.status(code.INTERNAL_SERVER_ERROR).json({
    message: 'Internal Server Error',
    error: errorMessage,
  });
};

export default errorHandler;

