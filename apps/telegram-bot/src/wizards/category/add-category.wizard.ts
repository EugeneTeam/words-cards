import { Ctx, Wizard, WizardStep } from 'nestjs-telegraf';
import { ContextInterface } from '../../interfaces/context.interface';

@Wizard('add-category')
export class AddCategoryWizard {
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
    const categories = context.update.message.text.split('\n');

    // TODO save in DB
    await context.reply(categories);
    return;
  }
}
