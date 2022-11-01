import { Inject, Injectable } from '@nestjs/common';

import { USER_REPOSITORY_TOKEN } from './constants/user-repository-token.constant';
import { UserRepositoryInterface } from './interfaces/user-repository.interface';
import { UserInterface } from './interfaces/user.interface';
import { InsertUserInterface } from './interfaces/insert-user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepositoryInterface<UserInterface>,
  ) {}

  async insertOne(data: InsertUserInterface): Promise<UserInterface> {
    return this.userRepository.insertOne(data);
  }
}
