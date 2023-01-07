import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextInterface } from '../../interfaces/context.interface';
import { UiBuilderUtil } from '../../utils/ui-builder/ui-builder.util';

@Scene('words-menu-operation-scene')
export class WordMenuOperationScene {
  @SceneEnter()
  public async sceneEnter(@Ctx() context: ContextInterface): Promise<void> {
    await context.removePreviousKeyboard();
    const builder = new UiBuilderUtil(context.languageIso)
      .useInlineKeyboardMethod()
      .addNewButtonLine()
      .addTitle('words-operation-title')
      .addButton('words-operation-add-word', 'callback', true)
      .addButton('words-operation-remove-word', 'callback', true)
      .addButton('words-operation-edit-word', 'callback', true)
      .addButton('words-operation-view-list', 'callback', true)
      .addButton('words-operation-upload-file', 'callback', true)
      .addBackButton('main-menu-scene')
      .build();

    await context.replyWithHTML(builder.title, builder.buttons);
  }
}
