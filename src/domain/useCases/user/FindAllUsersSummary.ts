import { UserResponse } from '../../dto/UserResponse';

export interface FindAllUsersSummaryInterface {

  execute(): Promise<UserResponse[] | undefined>
}
