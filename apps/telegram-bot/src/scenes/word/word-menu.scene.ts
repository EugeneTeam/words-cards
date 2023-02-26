import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextInterface } from '../../interfaces/context.interface';
import { UiBuilderUtil } from '../../utils/ui-builder/ui-builder.util';
import { UiBuilderPanelInterface } from '../../utils/ui-builder/interfaces/ui-builder-panel.interface';
import { WizardUtilsExtend } from '../../extends/wizard-utils.extend';

@Scene('word-menu-scene')
export class WordMenuScene extends WizardUtilsExtend {
  @SceneEnter()
  public async sceneEnter(@Ctx() context: ContextInterface): Promise<void> {
    await this.deleteLastKeyboard(context);
    const builder: UiBuilderPanelInterface = new UiBuilderUtil(
      context.languageIso,
    )
      .useInlineKeyboardMethod()
      .addNewButtonLine()
      .addTitle('manage-words:title')
      .addButton('manage-words:add-short', 'OPEN:add-word-short-wizard', true)
      .addButton('manage-words:add', 'OPEN:add-word-wizard', true)
      .addButton('manage-words:remove', 'callback', true)
      .addButton('manage-words:update', 'callback', true)
      .addButton('manage-words:list', 'callback', true)
      .addButton('manage-words:upload-file', 'callback', true)
      .addBackButton('main-menu-scene')
      .build();

    await context.replyWithHTML(builder.title, builder.buttons);
  }
}
