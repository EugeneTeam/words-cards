import { Action, Ctx, Wizard, WizardStep } from 'nestjs-telegraf';
import { ContextInterface } from '../../interfaces/context.interface';
import { CategoryService } from '../../category/category.service';
import { StatusInterface } from '../../common/interfaces/status.interface';
import { WizardUtilsExtend } from '../../extends/wizard-utils.extend';
import { CategoryNewNameUi } from '../../ui/category-new-name.ui';
import { CategoryRemoveUi } from '../../ui/category-remove.ui';
import { CategoryInfoUi } from '../../ui/category-info.ui';

/**
 * Deleting a category, UI + API + telegraf
 * Category name update, UI + API + telegraf
 */
@Wizard('categories-info-wizard')
export class CategoryInfoWizard extends WizardUtilsExtend {
  constructor(private readonly categoryService: CategoryService) {
    super();
  }

  /**
   * Delete or update a category
   * @param context
   */
  @WizardStep(1)
  public async categoryInfo(@Ctx() context: ContextInterface): Promise<void> {
    const { category, categoryUuid } = context.scene.state;
    context.wizard.state.category = category;
    context.wizard.state.uuid = categoryUuid;

    const { title, buttons } = CategoryInfoUi(context);

    await context.replyWithHTML(title, buttons);
    await context.wizard.next();
  }

  @WizardStep(2)
  public async buffer1(@Ctx() context: ContextInterface): Promise<void> {
    await context.reply(
      context.translatorService.getTranslate('user-action-expected'),
    );
    return;
  }

  /**
   * Entering a new category name
   * @param context
   */
  @WizardStep(3)
  public async newCategoryName(
    @Ctx() context: ContextInterface,
  ): Promise<void> {
    const newCategoryName =
      context?.update?.message?.text || context?.message?.text;

    context.wizard.state.newCategoryName = newCategoryName;

    const { title, buttons } = CategoryNewNameUi(context, newCategoryName);

    await context.replyWithHTML(title, buttons);
  }

  /**
   * Exit the wizard
   * @param context
   * @private
   */
  @Action('back')
  private async back(@Ctx() context: ContextInterface): Promise<void> {
    await context.scene.leave();
    await context.scene.enter('categories-list-scene');
  }

  /**
   * Saving a new category name
   * @param context
   * @private
   */
  @Action('save')
  private async save(@Ctx() context: ContextInterface): Promise<void> {
    const uuid = context.wizard.state.uuid;
    const name = context.wizard.state.newCategoryName;
    const result: StatusInterface = await this.categoryService.updateCategory(
      uuid,
      name,
      context.session.userUuid,
    );

    if (result.status) {
      await context.reply(
        context.translatorService.getTranslate('category-updated'),
      );
    } else {
      await context.reply(
        context.translatorService.getTranslate('something-went-wrong'),
      );
    }

    await context.scene.leave();
    await context.scene.enter('categories-list-scene');
  }

  /**
   * Confirm or cancel category deletion
   * @param context
   * @private
   */
  @Action('remove-category-question')
  private async removeQuestion(
    @Ctx() context: ContextInterface,
  ): Promise<void> {
    await this.deleteLastKeyboard(context);

    const { title, buttons } = CategoryRemoveUi(context);
    await context.replyWithHTML(title, buttons);
  }

  /**
   * Deleting a category
   * @param context
   * @private
   */
  @Action('remove')
  private async remove(@Ctx() context: ContextInterface): Promise<void> {
    const categoryUuid = context.wizard.state.categoryUuid;
    const result: StatusInterface =
      await this.categoryService.removeCategoryByUuid(
        categoryUuid,
        context.session.userUuid,
      );

    if (result.status) {
      await context.reply(
        context.translatorService.getTranslate('category-deleted'),
      );
    } else {
      await context.reply(
        context.translatorService.getTranslate('something-went-wrong'),
      );
    }
    await context.scene.leave();
    await context.scene.enter('categories-list-scene');
  }

  /**
   * Cancel deleting or editing a category
   * @param context
   * @private
   */
  @Action('cancel')
  private async cancel(@Ctx() context: ContextInterface): Promise<void> {
    await context.scene.leave();
    await context.scene.enter('categories-list-scene');
  }

  @Action('edit-category-enter')
  private async edit(@Ctx() context: ContextInterface): Promise<void> {
    await this.deleteLastKeyboard(context);
    await context.reply(
      context.translatorService.getTranslate('category-enter-name'),
    );
    await context.wizard.next();
  }
}
