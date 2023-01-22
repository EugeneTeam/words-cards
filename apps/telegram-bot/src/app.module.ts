import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';

import { ConfigModuleConfig } from '../../../common/config/config-module/config-module.config';
import { UserModule } from './user/user.module';
import { TelegramConfig } from './config/telegram/telegram.config';
import { FileModule } from './file/file.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ActionsModule } from './actions/actions.module';
import { ScenesModule } from './scenes/scenes.module';
import { WizardsModule } from './wizards/wizards.module';
import { LanguageModule } from './language/language.module';
import { WordModule } from './word/word.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleConfig),
    TelegrafModule.forRootAsync({
      useClass: TelegramConfig,
    }),
    UserModule,
    FileModule,
    ConfigurationModule,
    ActionsModule,
    ScenesModule,
    WizardsModule,
    LanguageModule,
    WordModule,
    CategoryModule,
  ],
  providers: [],
})
export class AppModule {}
