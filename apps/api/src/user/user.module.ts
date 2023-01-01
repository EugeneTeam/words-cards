import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepositoryProvider } from './providers/user-repository.provider';
import { LanguageModule } from '../language/language.module';

@Module({
  imports: [LanguageModule],
  providers: [UserService, UserRepositoryProvider],
  controllers: [UserController],
})
export class UserModule {}
