import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

export class AppService {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  public async downloadFileByFileId(fileId: string): Promise<URL> {
    return this.bot.telegram.getFileLink(fileId);
  }
}
