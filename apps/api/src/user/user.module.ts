import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepositoryProvider } from './providers/user-repository.provider';

@Module({
  providers: [UserService, UserRepositoryProvider],
  controllers: [UserController],
})
export class UserModule {}
