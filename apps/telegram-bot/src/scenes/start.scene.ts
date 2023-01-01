import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';

import { ContextInterface } from '../interfaces/context.interface';
import { WelcomeParameterInterface } from '../languages/interfaces/welcome.parameter-interface';
import { StartSceneDataInterface } from './interfaces/start-scene-data.interface';
import { ReplyWithPhotoUtil } from '../utils/reply-with-photo.util';

@Scene('start-scene')
export class StartScene {
  @SceneEnter()
  public async sceneEnter(@Ctx() context: ContextInterface): Promise<void> {
    const data: StartSceneDataInterface = context.scene.state;

    const title: string =
      context.translatorService.getTranslate<WelcomeParameterInterface>(
        'welcome',
        data,
      );

    await ReplyWithPhotoUtil(context, title, 'image/static-images/welcome.png');

    await context.scene.enter('main-menu-scene');
  }
}
