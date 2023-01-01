import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';

import { ConfigModuleConfig } from '../../../common/config/config-module/config-module.config';
import { UserModule } from './user/user.module';
import { TelegramConfig } from './config/telegram/telegram.config';
import { FileModule } from './file/file.module';
import { StartScene } from './scenes/start.scene';
import { MainMenuScene } from './scenes/main-menu/main-menu.scene';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleConfig),
    TelegrafModule.forRootAsync({
      useClass: TelegramConfig,
    }),
    UserModule,
    FileModule,
    StartScene,
    MainMenuScene,
  ],
  providers: [],
})
export class AppModule {}
