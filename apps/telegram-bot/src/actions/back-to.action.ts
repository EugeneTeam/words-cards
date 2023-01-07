import { Action, Ctx, Update } from 'nestjs-telegraf';
import { ContextInterface } from '../interfaces/context.interface';

@Update()
export class BackToAction {
  @Action(/^back-to-/)
  public async backButtonAction(
    @Ctx() context: ContextInterface,
  ): Promise<void> {
    await context.removePreviousKeyboard();
    const sceneName = context.update.callback_query.data.replace(
      /back-to-/g,
      '',
    );
    await context.scene.enter(sceneName);
  }
}
