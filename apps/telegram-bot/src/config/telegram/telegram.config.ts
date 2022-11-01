import { Injectable } from '@nestjs/common';
import { TelegrafModuleOptions, TelegrafOptionsFactory } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';

import { sessionMiddleware } from '../../middlewares/session.middleware';

@Injectable()
export class TelegramConfig implements TelegrafOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTelegrafOptions():
    | Promise<TelegrafModuleOptions>
    | TelegrafModuleOptions {
    return {
      token: this.configService.get<string>('TELEGRAM_BOT_TOKEN'),
      middlewares: [sessionMiddleware],
    };
  }
}
