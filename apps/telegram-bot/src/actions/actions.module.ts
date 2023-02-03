import { Module } from '@nestjs/common';
import { CommonAction } from './common.action';
import { StartAction } from './start.action';
import { UserModule } from '../user/user.module';
import { ConfigurationModule } from '../configuration/configuration.module';
import { CategoryAction } from './category/category.action';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [UserModule, ConfigurationModule, CategoryModule],
  providers: [CommonAction, StartAction, CategoryAction],
})
export class ActionsModule {}
