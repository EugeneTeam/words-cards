import { Module } from '@nestjs/common';
import { CommonAction } from './common.action';
import { StartAction } from './start.action';
import { UserModule } from '../user/user.module';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
  imports: [UserModule, ConfigurationModule],
  providers: [CommonAction, StartAction],
})
export class ActionsModule {}
