import { User } from '../../domain/entity/User';
import { UserRepositoryInterface } from '../../domain/repository/user/UserRepository';
import { FindAllUsersInterface } from '../../domain/useCases/user/FindAllUsers';

export default class FindAllUser implements FindAllUsersInterface {
  UserRepository: UserRepositoryInterface;

  constructor(UserRepository: UserRepositoryInterface) {
    this.UserRepository = UserRepository;
  }

  async execute(): Promise<User[] | undefined> {
    const result = await this.UserRepository.findAllUsers();
    return result;
  }
}
