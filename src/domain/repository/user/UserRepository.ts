import { User } from '../../entity/User';

export interface UserRepositoryInterface {
  saveUser(user: User): Promise<void>;
  findAllUsers(): Promise<User[] | undefined>;
  findUserByEmail(email: string): Promise<User | undefined>;
  findUserById(id: string): Promise<User | undefined>;
}
