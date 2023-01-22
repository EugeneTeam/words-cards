import { Action, Ctx, Wizard, WizardStep } from 'nestjs-telegraf';
import { ContextInterface } from '../../interfaces/context.interface';
import { CategoryService } from '../../category/category.service';
import { UiBuilderUtil } from '../../utils/ui-builder/ui-builder.util';
import { AddCategoriesResponseInterface } from '../../category/interfaces/add-categories-response.interface';

@Wizard('add-category-wizard')
export class AddCategoryWizard {
  constructor(private readonly categoryService: CategoryService) {}

  @WizardStep(1)
  public async enter(@Ctx() context: ContextInterface): Promise<void> {
    await context.replyWithHTML(
      context.translatorService.getTranslate('add-category-info'),
    );
    await context.reply(
      context.translatorService.getTranslate('enter-category'),
    );
    await context.wizard.next();
  }

  @WizardStep(2)
  public async enterCategory(@Ctx() context: ContextInterface): Promise<void> {
    const categories = (
      context?.update?.message?.text || context?.message?.text
    ).split('\n');

    context.wizard.state.categories = categories;

    const builder = new UiBuilderUtil(context.languageIso)
      .useInlineKeyboardMethod()
      .addNewButtonLine()
      .addTitle<{ categories: string }>('add-category-question', {
        categories: categories.join('\n'),
      })
      .addButton('save', 'save')
      .addButton('cancel', 'cancel')
      .build();
    await context.replyWithHTML(builder.title, builder.buttons);
    await context.wizard.next();
  }

  @WizardStep(3)
  public async buffer(@Ctx() context: ContextInterface): Promise<void> {
    await context.reply(
      context.translatorService.getTranslate('user-action-expected'),
    );
    return;
  }

  @Action('save')
  private async save(@Ctx() context: ContextInterface): Promise<void> {
    const response: AddCategoriesResponseInterface =
      await this.categoryService.createOneCategory({
        categories: context.wizard.state.categories,
        userUuid: context.session.userUuid,
      });

    const addedCategories = response.addedCategories?.length
      ? response.addedCategories.join('\n')
      : context.translatorService.getTranslate(
          'add-category-new-category-not-added',
        );

    const skippedCategories = response.skippedCategories?.length
      ? response.skippedCategories.join('\n')
      : context.translatorService.getTranslate(
          'add-category-duplicate-not-found',
        );

    await context.replyWithHTML(
      context.translatorService.getTranslate<AddCategoriesResponseInterface>(
        'add-category-response',
        {
          addedCategories,
          skippedCategories,
        },
      ),
    );
    await context.removePreviousKeyboard();
    await context.scene.leave();
    await context.scene.enter('category-menu-scene');
  }

  @Action('cancel')
  private async cancel(@Ctx() context: ContextInterface): Promise<void> {
    await context.removePreviousKeyboard();
    await context.scene.leave();
    await context.scene.enter('category-menu-scene');
  }
}
