import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';

import { UserModule } from './user/user.module';
import { KnexConfig } from './config/knex/knex.config';
import { ConfigModuleConfig } from '../../../common/config/config-module/config-module.config';
import { FileModule } from './files/file.module';
import { LanguageModule } from './language/language.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { WordModule } from './word/word.module';
import { TranslationModule } from './translation/translation.module';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleConfig),
    KnexModule.forRootAsync({
      useClass: KnexConfig,
    }),
    UserModule,
    FileModule,
    LanguageModule,
    ConfigurationModule,
    WordModule,
    TranslationModule,
  ],
})
export class ApiModule {}
