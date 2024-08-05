import { User } from '../../entity/User';

export interface FindUserByEmailInterface {
  execute(User: User): Promise<void>;
}
