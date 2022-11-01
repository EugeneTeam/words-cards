import { Provider } from '@nestjs/common';

import { USER_REPOSITORY_TOKEN } from '../constants/user-repository-token.constant';
import { UserRepository } from '../user.repository';

export const UserRepositoryProvider: Provider = {
  provide: USER_REPOSITORY_TOKEN,
  useClass: UserRepository,
};
