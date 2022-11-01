import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';

import { UserRepositoryInterface } from './interfaces/user-repository.interface';
import { UserInterface } from './interfaces/user.interface';
import { InsertUserInterface } from './interfaces/insert-user.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface<UserInterface> {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async insertOne(data: InsertUserInterface): Promise<UserInterface> {
    await this.knex<InsertUserInterface>('users')
      .insert(data)
      .onConflict('telegramId')
      .ignore()
      .returning('*');

    return this.getOneByTelegramId(data.telegramId);
  }

  async getOneByTelegramId(telegramId: string): Promise<UserInterface> {
    return this.knex<UserInterface>('users')
      .select()
      .where({ telegramId })
      .first();
  }
}
