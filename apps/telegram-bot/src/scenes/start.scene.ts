import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { createReadStream } from 'fs';
import { join } from 'path';

import { ContextInterface } from '../interfaces/context.interface';
import { WelcomeParameterInterface } from '../languages/interfaces/welcome.parameter-interface';
import { StartSceneDataInterface } from './interfaces/start-scene-data.interface';

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

    await context.replyWithPhoto(
      {
        source: createReadStream(
          join(__dirname, 'image', 'static-images', 'welcome.png'),
        ),
      },
      {
        caption: title,
        parse_mode: 'HTML',
      },
    );
  }
}
