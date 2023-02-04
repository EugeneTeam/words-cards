import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../configuration/configuration.module';
import { LanguageModule } from '../language/language.module';
import { WordModule } from '../word/word.module';
import { AddWordShortWizard } from './word/add-word-short.wizard';
import { AddCategoryWizard } from './category/add-category.wizard';
import { CategoryModule } from '../category/category.module';
import { CategoryInfoWizard } from './category/category-info.wizard';

@Module({
  imports: [ConfigurationModule, LanguageModule, WordModule, CategoryModule],
  providers: [AddWordShortWizard, AddCategoryWizard, CategoryInfoWizard],
})
export class WizardsModule {}
