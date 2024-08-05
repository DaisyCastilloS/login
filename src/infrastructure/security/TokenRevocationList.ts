export interface TokenRevocationList {
  add(token: string, expiresAt: number): Promise<void>;
  isRevoked(token: string): Promise<boolean>;
}
