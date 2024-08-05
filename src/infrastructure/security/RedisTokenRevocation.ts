import redis from '../Redisclient';
import { TokenRevocationList } from './TokenRevocationList';

class RedisTokenRevocationList implements TokenRevocationList {
  private redis: typeof redis;

  constructor() {
    this.redis = redis;
  }

  async add(token: string, expiresAt: number): Promise<void> {
    const ttl = expiresAt - Math.floor(Date.now() / 1000);
    await this.redis.set(token, 'revoked', 'EX', ttl);
  }

  async isRevoked(token: string): Promise<boolean> {
    const result = await this.redis.get(token);
    return result === 'revoked';
  }
}

export default RedisTokenRevocationList;
