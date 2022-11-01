import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';

import { ConfigModuleConfig } from '../../../common/config/config-module/config-module.config';
import { UserModule } from './user/user.module';
import { TelegramConfig } from './config/telegram/telegram.config';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleConfig),
    TelegrafModule.forRootAsync({
      useClass: TelegramConfig,
    }),
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
