import { ConfigService } from '@nestjs/config';
import { Ctx, Start, Update } from 'nestjs-telegraf';

import { UserService } from '../user/user.service';
import { TelegrafContext } from '../utils/get-data-from-context.util';
import { ContextInterface } from '../interfaces/context.interface';
import { StartSceneDataInterface } from '../scenes/interfaces/start-scene-data.interface';
import { InsertUserInterface } from '../user/interfaces/insert-user.interface';

@Update()
export class StartAction {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Start()
  public async start(@Ctx() context: ContextInterface): Promise<void> {
    const data: InsertUserInterface = {
      telegramId: TelegrafContext.getTelegramId(context),
      nickname: TelegrafContext.getNickname(context),
      firstName: TelegrafContext.getFirstName(context),
      lastName: TelegrafContext.getLastName(context),
    };

    await this.userService.insertOne(data);

    const username: string =
      TelegrafContext.getFirstName(context) ||
      TelegrafContext.getLastName(context);

    const botName: string = this.configService.get<string>('BOT_NAME');

    await context.scene.enter('start-scene', {
      username,
      botName,
    } as StartSceneDataInterface);
  }
}
