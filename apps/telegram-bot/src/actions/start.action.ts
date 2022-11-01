import { Ctx, Start, Update } from 'nestjs-telegraf';

import { UserService } from '../user/user.service';

@Update()
export class StartAction {
  constructor(private readonly userService: UserService) {}

  @Start()
  public async start(@Ctx() context: any): Promise<void> {
    const data = {
      telegramId: this.getTelegramIdFromContextUtil(context),
      nickname: this.getNicknameFromContext(context),
      firstName: this.getFirstNameFromContext(context),
      lastName: this.getLastNameFromContext(context),
    };

    await this.userService.insertOne(data);
  }

  private getNicknameFromContext(context: any): string {
    return (
      context.update?.message?.from?.username ||
      context.update?.message?.chat?.username ||
      context.update?.callback_query?.from?.username
    );
  }

  private getFirstNameFromContext(context: any): string {
    return (
      context.update?.message?.from?.first_name ||
      context.update?.callback_query?.from?.first_name
    );
  }

  private getLastNameFromContext(context: any): string {
    return (
      context.update?.message?.from?.last_name ||
      context.update?.callback_query?.from?.last_name
    );
  }

  private getTelegramIdFromContextUtil(context: any) {
    return (
      context?.userTelegramId ||
      context?.update?.message?.from?.id ||
      context?.update?.callback_query?.from?.id
    );
  }
}
