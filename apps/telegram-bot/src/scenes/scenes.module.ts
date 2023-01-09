import { Module } from '@nestjs/common';
import { MainMenuScene } from './main-menu/main-menu.scene';
import { WordsMenuScene } from './words-menu/words-menu.scene';
import { WordMenuOperationScene } from './words-menu/word-menu-operation.scene';
import { StartScene } from './start.scene';

@Module({
  providers: [
    MainMenuScene,
    WordsMenuScene,
    WordMenuOperationScene,
    StartScene,
  ],
})
export class ScenesModule {}
