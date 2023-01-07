import { Action, Ctx, Update } from 'nestjs-telegraf';
import { ContextInterface } from '../interfaces/context.interface';

@Update()
export class CommonAction {
  @Action(/^BACK-TO:[a-z-]+$/)
  public async backButtonAction(
    @Ctx() context: ContextInterface,
  ): Promise<void> {
    await context.removePreviousKeyboard();
    const sceneName = context.update.callback_query.data.replace(
      /BACK-TO:/g,
      '',
    );
    await context.scene.enter(sceneName);
  }

  @Action(/^OPEN:[a-z\-]+$/)
  public async automaticSceneOpening(
    @Ctx() context: ContextInterface,
  ): Promise<void> {
    await context.removePreviousKeyboard();
    const sceneName = context.update.callback_query.data.replace(/OPEN:/g, '');
    await context.scene.enter(sceneName);
  }
}
