import { Module } from '@nestjs/common';
import { MainMenuScene } from './main-menu/main-menu.scene';
import { StartScene } from './start.scene';
import { WordMenuScene } from './word/word-menu.scene';
import { CategoryMenuScene } from './category/category-menu.scene';
import { CategoryListScene } from './category/category-list.scene';
import { CategoryModule } from '../category/category.module';
import { CategoryInfoScene } from './category/category-info.scene';

@Module({
  imports: [CategoryModule],
  providers: [
    MainMenuScene,
    WordMenuScene,
    StartScene,
    CategoryMenuScene,
    CategoryListScene,
    CategoryInfoScene,
  ],
})
export class ScenesModule {}
