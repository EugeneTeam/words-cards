import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../configuration/configuration.module';
import { LanguageModule } from '../language/language.module';
import { AddWordShortWizard } from './add-word/add-word-short.wizard';

@Module({
  imports: [ConfigurationModule, LanguageModule],
  providers: [AddWordShortWizard],
})
export class WizardsModule {}
