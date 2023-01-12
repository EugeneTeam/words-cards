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
}
