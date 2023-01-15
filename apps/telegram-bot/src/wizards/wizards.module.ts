import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../configuration/configuration.module';
import { LanguageModule } from '../language/language.module';
import { AddWordShortWizard } from './add-word/add-word-short.wizard';
import { WordModule } from '../word/word.module';

@Module({
  imports: [ConfigurationModule, LanguageModule, WordModule],
  providers: [AddWordShortWizard],
})
export class WizardsModule {}
