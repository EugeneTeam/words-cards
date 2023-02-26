import { ContextInterface } from '../interfaces/context.interface';

export class WizardUtilsExtend {
  public getMessageText(context: ContextInterface): string {
    return context?.update?.messate?.text || context?.message?.text;
  }

  public async renderWizardStep(
    context: ContextInterface,
    step: number,
  ): Promise<void> {
    await context.wizard.steps[step - 1](context);
  }

  public async deleteLastMessage(context: ContextInterface): Promise<void> {
    await context.deleteMessage(
      context?.update?.messate?.id || context?.message?.id,
    );
  }

  public async deleteLastKeyboard(context: ContextInterface): Promise<void> {
    try {
      await context.answerCbQuery();
      await context.editMessageReplyMarkup({ inline_keyboard: [] });
    } catch (e) {}
  }

  /**
   * When using markdown, you need to escape some special characters
   * @param value
   */
  public addBackslash(value: string): string {
    return value.replace(/([!"№;%:?*()_+/{}\[\]',<.>`~\-])/gm, (w) => {
      return `\\${w}`;
    });
  }
}
