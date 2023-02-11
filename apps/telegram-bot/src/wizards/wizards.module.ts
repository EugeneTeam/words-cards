import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../configuration/configuration.module';
import { LanguageModule } from '../language/language.module';
import { WordModule } from '../word/word.module';
import { AddWordShortWizard } from './word/add-word-short.wizard';
import { AddCategoryWizard } from './category/add-category.wizard';
import { CategoryModule } from '../category/category.module';
import { CategoryInfoWizard } from './category/category-info.wizard';
import { AddWordWizard } from './word/add-word.wizard';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    ConfigurationModule,
    LanguageModule,
    WordModule,
    CategoryModule,
    FileModule,
  ],
  providers: [
    AddWordShortWizard,
    AddCategoryWizard,
    CategoryInfoWizard,
    AddWordWizard,
  ],
})
export class WizardsModule {}
