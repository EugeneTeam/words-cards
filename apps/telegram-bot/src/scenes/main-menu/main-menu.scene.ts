import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextInterface } from '../../interfaces/context.interface';
import { UiBuilderUtil } from '../../utils/ui-builder/ui-builder.util';

@Scene('main-menu-scene')
export class MainMenuScene {
  @SceneEnter()
  public async sceneEnter(@Ctx() context: ContextInterface): Promise<void> {
    const builder = new UiBuilderUtil(context.languageIso)
      .addNewButtonLine()
      .useInlineKeyboardMethod()
      // TODO example name
      .addTitle('main-menu-title')
      // TODO example name
      .addButton('main-menu-button-1')
      // TODO example callback name
      .addCallback('asdasd')
      .build();
    await context.replyWithHTML(builder.title, builder.buttons);
  }
}
