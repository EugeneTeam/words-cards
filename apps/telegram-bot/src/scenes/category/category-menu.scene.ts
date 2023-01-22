import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextInterface } from '../../interfaces/context.interface';
import { UiBuilderUtil } from '../../utils/ui-builder/ui-builder.util';
import { UiBuilderPanelInterface } from '../../utils/ui-builder/interfaces/ui-builder-panel.interface';

@Scene('category-menu-scene')
export class CategoryMenuScene {
  @SceneEnter()
  public async sceneEnter(@Ctx() context: ContextInterface): Promise<void> {
    await context.removePreviousKeyboard();
    const builder: UiBuilderPanelInterface = new UiBuilderUtil(
      context.languageIso,
    )
      .useInlineKeyboardMethod()
      .addNewButtonLine()
      .addTitle('categories-menu:title')
      .addButton('categories-menu:add', 'OPEN:add-category-wizard', true)
      .addButton('categories-menu:remove', 'callback', true)
      .addButton('categories-menu:update', 'callback', true)
      .addButton('categories-menu:list', 'OPEN:categories-list-scene', true)
      .addBackButton('main-menu-scene')
      .build();

    await context.replyWithHTML(builder.title, builder.buttons);
  }
}
