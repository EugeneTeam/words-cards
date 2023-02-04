import { ContextInterface } from '../interfaces/context.interface';

export class TelegrafContext {
  public static getNickname(context: ContextInterface): string {
    return (
      context.update?.message?.from?.username ||
      context.update?.message?.chat?.username ||
      context.update?.callback_query?.from?.username
    );
  }

  public static getFirstName(context: ContextInterface): string {
    return (
      context.update?.message?.from?.first_name ||
      context.update?.callback_query?.from?.first_name
    );
  }

  public static getLastName(context: ContextInterface): string {
    return (
      context.update?.message?.from?.last_name ||
      context.update?.callback_query?.from?.last_name
    );
  }

  public static getTelegramId(context: ContextInterface): string {
    return (
      context?.update?.message?.from?.id ||
      context?.update?.callback_query?.from?.id
    );
  }
}
