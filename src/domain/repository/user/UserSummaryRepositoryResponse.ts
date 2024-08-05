// src/domain/repository/UserSummaryRepository.ts este es el metodo
// que usara el endpoint get para responder name,exp y serie
import { UserResponse } from '../../dto/UserResponse';

export interface UserSummaryRepositoryInterface {
  findAllUsersSummary(): Promise<UserResponse[] | undefined>;
}
