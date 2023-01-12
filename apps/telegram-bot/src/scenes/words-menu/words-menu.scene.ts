import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextInterface } from '../../interfaces/context.interface';
import { UiBuilderUtil } from '../../utils/ui-builder/ui-builder.util';
import { UiBuilderPanelInterface } from '../../utils/ui-builder/interfaces/ui-builder-panel.interface';

@Scene('words-menu-scene')
export class WordsMenuScene {
  @SceneEnter()
  public async sceneEnter(@Ctx() context: ContextInterface): Promise<void> {
    await context.removePreviousKeyboard();
    const builder: UiBuilderPanelInterface = new UiBuilderUtil(
      context.languageIso,
    )
      .useInlineKeyboardMethod()
      .addNewButtonLine()
      .addTitle('main-menu-buttons-words')
      .addButton('words-menu-repeat-words', 'callback', true)
      .addButton('words-menu-learn-words', 'callback', true)
      .addButton(
        'words-menu-manage-word-list',
        'OPEN:words-menu-operation-scene',
        true,
      )
      .addButton('words-menu-manage-category-list', 'callback', true)
      .addBackButton('main-menu-scene')
      .build();

    await context.replyWithHTML(builder.title, builder.buttons);
  }
}
