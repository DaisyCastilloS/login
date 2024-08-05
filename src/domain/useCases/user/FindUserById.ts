import { User } from '../../entity/User';

export interface FindUserByIdInterface {
  execute(User: User): Promise<void>;
}
