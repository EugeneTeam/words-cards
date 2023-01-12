import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextInterface } from '../../interfaces/context.interface';
import { UiBuilderUtil } from '../../utils/ui-builder/ui-builder.util';
import { UiBuilderPanelInterface } from '../../utils/ui-builder/interfaces/ui-builder-panel.interface';

@Scene('main-menu-scene')
export class MainMenuScene {
  @SceneEnter()
  public async sceneEnter(@Ctx() context: ContextInterface): Promise<void> {
    const builder: UiBuilderPanelInterface = new UiBuilderUtil(
      context.languageIso,
    )
      .useInlineKeyboardMethod()
      .addNewButtonLine()
      .addTitle('main-menu-title')
      .addButton('main-menu-buttons-words', 'OPEN:words-menu-scene', true)
      .addButton('main-menu-buttons-setting', 'test-action-setting', true)
      .addButton('main-menu-buttons-statistic', 'callback', true)
      .build();

    await context.replyWithHTML(builder.title, builder.buttons);
  }
}
