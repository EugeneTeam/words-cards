import { Module } from '@nestjs/common';
import { AddWordWizard } from './add-word.wizard';
import { ConfigurationModule } from '../configuration/configuration.module';
import { LanguageModule } from '../language/language.module';

@Module({
  imports: [ConfigurationModule, LanguageModule],
  providers: [AddWordWizard],
})
export class WizardsModule {}
