export class TelegrafContext {
  static getNickname(context: any): string {
    return (
      context.update?.message?.from?.username ||
      context.update?.message?.chat?.username ||
      context.update?.callback_query?.from?.username
    );
  }

  static getFirstName(context: any): string {
    return (
      context.update?.message?.from?.first_name ||
      context.update?.callback_query?.from?.first_name
    );
  }

  static getLastName(context: any): string {
    return (
      context.update?.message?.from?.last_name ||
      context.update?.callback_query?.from?.last_name
    );
  }

  static getTelegramId(context: any) {
    return (
      context?.userTelegramId ||
      context?.update?.message?.from?.id ||
      context?.update?.callback_query?.from?.id
    );
  }
}
