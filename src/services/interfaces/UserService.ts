import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, UserWithMethods } from '../../domain/entity/User';
import { UserRepositoryInterface } from '../../domain/repository/user/UserRepository';
import { TokenRevocationList } from '../../infrastructure/security/TokenRevocationList';

export default class UserService {
  constructor(
    private userRepository: UserRepositoryInterface,
    private tokenRevocationList: TokenRevocationList,
  ) {}

  async registerUser(user: UserWithMethods): Promise<void> {
    user.changePassword(await bcrypt.hash(user.password, 10));
    await this.userRepository.saveUser(user);
  }

  async loginUser(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET must be defined');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return token;
  }

  async logoutUser(token: string): Promise<void> {
    const decodedToken: any = jwt.decode(token);
    if (decodedToken && decodedToken.exp) {
      await this.tokenRevocationList.add(token, decodedToken.exp);
    }
  }

  async findUserById(id: string): Promise<User | undefined> {
    return this.userRepository.findUserById(id);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findUserByEmail(email);
  }

  async findAllUsers(): Promise<User[] | undefined> {
    return this.userRepository.findAllUsers();
  }
}
