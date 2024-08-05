import { UserResponse } from '../domain/dto/UserResponse';
import { User } from '../domain/entity/User';
import { UserRepositoryInterface } from '../domain/repository/user/UserRepository';
import { UserSummaryRepositoryInterface } from '../domain/repository/user/UserSummaryRepositoryResponse';
import { SQLDatabaseWrapperInterface } from '../infrastructure/interface/SQLDatabaseWrapperInterface';

const DB_TABLE = 'Users';

export default class PGDataSourceService implements
    UserRepositoryInterface, UserSummaryRepositoryInterface {
  db: SQLDatabaseWrapperInterface;

  constructor(db: SQLDatabaseWrapperInterface) {
    this.db = db;
  }

  async saveUser(user: User): Promise<void> {
    const query = `
      INSERT INTO ${DB_TABLE}
      (id, name, lastname, email, password, roles)
      VALUES ($1, $2, $3, $4, $5, $6::text[]);
    `;

    const values = [
      user.id,
      user.name,
      user.lastname,
      user.email,
      user.password,
      user.roles, // Deja el array tal como está
    ];

    await this.db.query(query, values);
  }

  async findAllUsersSummary(): Promise<UserResponse[] | undefined> {
    const result = await this.db.query(
      `SELECT name, lastname, roles FROM ${DB_TABLE};`,
    );

    const users: UserResponse[] = result.rows.map((row: {
      name: string;
      lastname: string;
      roles: string[];
    }) => ({
      name: row.name,
      lastname: row.lastname,
      roles: row.roles, // El array ya está en el formato correcto
    }));

    return users;
  }

  async findAllUsers(): Promise<User[] | undefined> {
    const result = await this.db.query(`SELECT * FROM ${DB_TABLE};`);

    const users: User[] = result.rows.map((row: {
      id: string;
      name: string;
      lastname: string;
      email: string;
      password: string;
      roles: string[];
    }) => ({
      id: row.id,
      name: row.name,
      lastname: row.lastname,
      email: row.email,
      password: row.password,
      roles: row.roles, // El array ya está en el formato correcto
    }));

    return users;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.db.query(`SELECT * FROM ${DB_TABLE} WHERE email = $1;`, [email]);

    if (result.rows.length === 0) {
      return undefined;
    }

    const row = result.rows[0];
    const user: User = {
      id: row.id,
      name: row.name,
      lastname: row.lastname,
      email: row.email,
      password: row.password,
      roles: row.roles, // El array ya está en el formato correcto
    };

    return user;
  }

  async findUserById(id: string): Promise<User | undefined> {
    const result = await this.db.query(`SELECT * FROM ${DB_TABLE} WHERE id = $1;`, [id]);

    if (result.rows.length === 0) {
      return undefined;
    }

    const row = result.rows[0];
    const user: User = {
      id: row.id,
      name: row.name,
      lastname: row.lastname,
      email: row.email,
      password: row.password,
      roles: row.roles, // El array ya está en el formato correcto
    };

    return user;
  }
}
