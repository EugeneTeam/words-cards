import { Ctx, Start, Update } from 'nestjs-telegraf';

import { UserService } from '../user/user.service';
import { TelegrafContext } from '../utils/get-data-from-context.util';

@Update()
export class StartAction {
  constructor(private readonly userService: UserService) {}

  @Start()
  public async start(@Ctx() context: any): Promise<void> {
    const data = {
      telegramId: TelegrafContext.getTelegramId(context),
      nickname: TelegrafContext.getNickname(context),
      firstName: TelegrafContext.getFirstName(context),
      lastName: TelegrafContext.getLastName(context),
    };

    await this.userService.insertOne(data);
  }
}
