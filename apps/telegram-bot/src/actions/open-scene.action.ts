import { Action, Ctx, Update } from 'nestjs-telegraf';
import { ContextInterface } from '../interfaces/context.interface';

@Update()
export class OpenSceneAction {
  @Action('open-words-menu-scene')
  public async opeWordsMenuScene(
    @Ctx() context: ContextInterface,
  ): Promise<void> {
    await context.scene.enter('words-menu-scene');
  }
}
