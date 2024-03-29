import { CategoryListComponentScene } from '../../scenes/category/category-list-component.scene';
import { Action, Ctx } from 'nestjs-telegraf';
import { ContextInterface } from '../../interfaces/context.interface';
import { CategoryListComponentDataInterface } from '../../scenes/interfaces/category-list-component-data.interface';

/**
 * Isolation of pagination functionality.
 * We create a class, inherit it from the reusable component (CategoryListComponentScene) + inherit utilities (WizardUtilsExtend).
 * In this class we describe:
 * - the method by which the list of categories will be opened
 * - describe the method of transition through the category pages
 * - we describe the action handler for clicking on the category
 */
export class AddWordIsolation extends CategoryListComponentScene {
  constructor(options: CategoryListComponentDataInterface) {
    super({
      ...options,
      categoryCallback: 'select-category',
    });
  }

  /**
   * The method by which the list of categories will be opened
   * @param context
   * @public
   */
  @Action('choose-category')
  public async chooseCategory(@Ctx() context: ContextInterface): Promise<void> {
    await this.renderList(context);
  }

  /**
   * Method of transition through the category pages
   * @param context
   * @public
   */
  @Action(/^PAGINATION-CATEGORY:[0-9a-z\-]+:[0-9]+:[0-9]+$/)
  public async pagination(@Ctx() context: ContextInterface): Promise<void> {
    const data: string[] = context.update.callback_query.data.split(':');
    const limit = Number(data[2]);
    const offset = Number(data[3]);
    if (limit > 0) {
      await this.renderList(context, limit, offset);
    }
    return;
  }

  /**
   * Action handler for clicking on the category
   * @param context
   * @public
   */
  @Action(/^select-category:[a-z0-9-]+$/)
  public async selectCategory(@Ctx() context: ContextInterface): Promise<void> {
    context.wizard.state.categoryUuid = context.update.callback_query.data
      .split(':')
      .pop();
    await context.reply(
      context.translatorService.getTranslate('add-word-category-added'),
    );
    await this.deleteLastKeyboard(context);
    await context.wizard.next();
    await this.renderWizardStep(context, 9);
  }

  @Action('deselect-category')
  public async deselectCategory(
    @Ctx() context: ContextInterface,
  ): Promise<void> {
    await context.reply(
      context.translatorService.getTranslate('add-word-cancel-choose-category'),
    );
    await this.deleteLastMessage(context);
    await this.deleteLastKeyboard(context);
    await context.wizard.next();
    await this.renderWizardStep(context, 9);
  }
}
