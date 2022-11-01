import { InsertUserInterface } from '../../../../telegram-bot/src/user/interfaces/insert-user.interface';

export interface UserRepositoryInterface<User> {
  insertOne(data: InsertUserInterface): Promise<User>;
  getOneByTelegramId(telegramId: string): Promise<User>;
}
