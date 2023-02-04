import { InsertUserInterface } from './insert-user.interface';
import { Observable } from 'rxjs';
import { TelegramIdInterface } from '../../../../../common/interfaces/telegramId.interface';

export interface UserRepositoryInterface<User> {
  insertOne(data: InsertUserInterface): Observable<User>;
  findUserByTelegramId(data: TelegramIdInterface): Observable<User>;
}
