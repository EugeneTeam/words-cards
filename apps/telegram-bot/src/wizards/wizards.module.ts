import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../configuration/configuration.module';
import { LanguageModule } from '../language/language.module';
import { WordModule } from '../word/word.module';
import { AddWordShortWizard } from './word/add-word-short.wizard';
import { AddCategoryWizard } from './category/add-category.wizard';

@Module({
  imports: [ConfigurationModule, LanguageModule, WordModule],
  providers: [AddWordShortWizard, AddCategoryWizard],
})
export class WizardsModule {}
