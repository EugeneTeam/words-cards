import { InsertUserInterface } from './insert-user.interface';
import { Observable } from 'rxjs';

export interface UserRepositoryInterface<User> {
  insertOne(data: InsertUserInterface): Observable<User>;
}
