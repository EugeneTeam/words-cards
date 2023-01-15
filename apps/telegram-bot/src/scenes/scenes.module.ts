import { Module } from '@nestjs/common';
import { MainMenuScene } from './main-menu/main-menu.scene';
import { StartScene } from './start.scene';
import { WordMenuScene } from './word/word-menu.scene';
import { CategoryMenuScene } from './category/category-menu.scene';

@Module({
  providers: [MainMenuScene, WordMenuScene, StartScene, CategoryMenuScene],
})
export class ScenesModule {}
