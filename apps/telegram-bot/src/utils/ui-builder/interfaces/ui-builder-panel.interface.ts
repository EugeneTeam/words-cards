import {
  InlineKeyboardMarkup,
  ReplyKeyboardMarkup,
} from 'telegraf/src/core/types/typegram';
import { Markup } from 'telegraf/src/markup';

export interface UiBuilderPanelInterface {
  title?: string;
  buttons?: Markup<InlineKeyboardMarkup> | Markup<ReplyKeyboardMarkup>;
}
