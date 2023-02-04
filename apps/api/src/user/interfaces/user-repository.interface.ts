import { InsertUserInterface } from '../../../../telegram-bot/src/user/interfaces/insert-user.interface';
import { TelegramIdInterface } from '../../../../../common/interfaces/telegramId.interface';

export interface UserRepositoryInterface<User> {
  insertOne(data: InsertUserInterface): Promise<User>;
  findUserByTelegramId(data: TelegramIdInterface): Promise<User>;
}
