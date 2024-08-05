import { Request } from 'express';
import { User } from '../../domain/entity/User';

export interface AuthenticatedRequest extends Request {
  user?: User;
}
