import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';

import { ConfigModuleConfig } from '../../../common/config/config-module/config-module.config';
import { UserModule } from './user/user.module';
import { TelegramConfig } from './config/telegram/telegram.config';
import { FileModule } from './file/file.module';
import { StartScene } from './scenes/start.scene';
import { MainMenuScene } from './scenes/main-menu/main-menu.scene';
import { OpenSceneAction } from './actions/open-scene.action';
import { WordsMenuScene } from './scenes/words-menu/words-menu.scene';
import { BackToAction } from './actions/back-to.action';

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
    OpenSceneAction,
    WordsMenuScene,
    BackToAction,
  ],
  providers: [],
})
export class AppModule {}
