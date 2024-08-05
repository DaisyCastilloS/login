import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';
import { SQLDatabaseWrapperInterface } from '../interface/SQLDatabaseWrapperInterface';

dotenv.config();

export default class SQLDatabase implements SQLDatabaseWrapperInterface {
  private static instance: SQLDatabase;

  private pool: Pool;

  private constructor(config: PoolConfig) {
    this.pool = new Pool(config);
  }

  public static getInstance(): SQLDatabase {
    if (!SQLDatabase.instance) {
      const useSSL = process.env.PGSSL === 'true';
      const sslConfig = useSSL ? { rejectUnauthorized: false } : false;

      SQLDatabase.instance = new SQLDatabase({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        port: Number(process.env.PGPORT),
        ssl: sslConfig,
      } as PoolConfig);
    }
    return SQLDatabase.instance;
  }

  public query(queryString: string, params?: any[]): Promise<{ rows: any[] }> {
    return this.pool.query(queryString, params);
  }
}
