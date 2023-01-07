import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextInterface } from '../../interfaces/context.interface';
import { UiBuilderUtil } from '../../utils/ui-builder/ui-builder.util';

@Scene('words-menu-scene')
export class WordsMenuScene {
  @SceneEnter()
  public async sceneEnter(@Ctx() context: ContextInterface): Promise<void> {
    await context.removePreviousKeyboard();
    const builder = new UiBuilderUtil(context.languageIso)
      .useInlineKeyboardMethod()
      .addNewButtonLine()
      .addTitle('main-menu-buttons-words')
      .addButton('words-menu-repeat-words', 'callback', true)
      .addButton('words-menu-learn-words', 'callback', true)
      .addButton('words-menu-manage-word-list', 'callback', true)
      .addButton('words-menu-manage-category-list', 'callback', true)
      .addBackButton('main-menu-scene')
      .build();

    await context.replyWithHTML(builder.title, builder.buttons);
  }
}
