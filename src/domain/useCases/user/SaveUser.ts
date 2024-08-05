import { User } from '../../entity/User';

export interface SaveUserInterface {
  execute(User: User): Promise<void>;
}
