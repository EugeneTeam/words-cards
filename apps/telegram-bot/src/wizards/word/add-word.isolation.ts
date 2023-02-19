import { CategoryService } from '../../category/category.service';
import { CategoryListComponentScene } from '../../scenes/category/category-list-component.scene';
import { Mixin } from 'ts-mixer';
import { WizardUtilsExtend } from '../../extends/wizard-utils.extend';
import { Action, Ctx } from 'nestjs-telegraf';
import { ContextInterface } from '../../interfaces/context.interface';

/**
 * Isolation of pagination functionality.
 * We create a class, inherit it from the reusable component (CategoryListComponentScene) + inherit utilities (WizardUtilsExtend).
 * In this class we describe:
 * - the method by which the list of categories will be opened
 * - describe the method of transition through the category pages
 * - we describe the action handler for clicking on the category
 */
export class AddWordIsolation extends Mixin(
  // TODO сделать кнопку back настраиваемой через конструктор родительского класcа.
  // TODO переделать её в "отмена"?
  CategoryListComponentScene,
  WizardUtilsExtend,
) {
  constructor(
    categoryService: CategoryService,
    sceneName: string,
    categoryCallback: string,
  ) {
    super(categoryService, sceneName, categoryCallback);
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
      await this.deleteLastMessage(context);
      await this.renderList(context, limit, offset);
    }
    return;
  }

  /**
   * Action handler for clicking on the category
   * @param context
   * @public
   */
  // TODO при клике по категории добавлять её uuid в wizard.state
  // some callback function
}
