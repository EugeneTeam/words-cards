import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';

import { UserModule } from './user/user.module';
import { KnexConfig } from './config/knex/knex.config';
import { ConfigModuleConfig } from '../../../common/config/config-module/config-module.config';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleConfig),
    KnexModule.forRootAsync({
      useClass: KnexConfig,
    }),
    UserModule,
  ],
})
export class ApiModule {}
