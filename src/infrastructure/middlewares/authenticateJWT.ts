import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../interface/AuthenticatedRequest'; // Ajusta la ruta según tu estructura de proyecto
import { TokenRevocationList } from '../security/TokenRevocationList';
import { User } from '../../domain/entity/User';

const authenticateJWT = (tokenRevocationList: TokenRevocationList) => async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401); // Unauthorized
  }

  const token = authHeader.split(' ')[1];
  const isRevoked = await tokenRevocationList.isRevoked(token);

  if (isRevoked) {
    return res.sendStatus(403); // Forbidden
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user as User;
    next();
    return undefined; // Retorno explícito después de next()
  });

  return undefined; // Retorno explícito al final de la función async
};

export default authenticateJWT;
