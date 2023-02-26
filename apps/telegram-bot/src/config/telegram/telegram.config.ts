import { Injectable } from '@nestjs/common';
import { TelegrafModuleOptions, TelegrafOptionsFactory } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';

import { sessionMiddleware } from '../../middlewares/session.middleware';
import { defaultLanguagesMiddleware } from '../../middlewares/default-languages.middleware';
import { translateMiddleware } from '../../middlewares/translate.middleware';
import { UserService } from '../../user/user.service';
import { TelegrafContext } from '../../utils/get-data-from-context.util';

@Injectable()
export class TelegramConfig implements TelegrafOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  createTelegrafOptions():
    | Promise<TelegrafModuleOptions>
    | TelegrafModuleOptions {
    return {
      token: this.configService.get<string>('TELEGRAM_BOT_TOKEN'),
      middlewares: [
        sessionMiddleware,
        defaultLanguagesMiddleware,
        translateMiddleware,
        async (context: any, next: any) => {
          if (!context?.session?.userUuid) {
            const user = await this.userService.findUserByTelegramId({
              telegramId: TelegrafContext.getTelegramId(context),
            });

            if (context?.session) {
              context.session['userUuid'] = user.uuid;
            } else {
              context['session'] = {
                userUuid: user.uuid,
              };
            }

            next();
          } else {
            next();
          }
        },
      ],
    };
  }
}
