import { User } from '../../entity/User';

export interface FindAllUsersInterface {

  execute(): Promise<User[] | undefined>
}
