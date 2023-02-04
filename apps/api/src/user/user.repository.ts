import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';

import { UserRepositoryInterface } from './interfaces/user-repository.interface';
import { UserInterface } from './interfaces/user.interface';
import { InsertUserInterface } from './interfaces/insert-user.interface';
import { TABLES } from '../../../../common/constants/tables-names.constant';
import { TelegramIdInterface } from '../../../../common/interfaces/telegramId.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface<UserInterface> {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async insertOne(data: InsertUserInterface): Promise<UserInterface> {
    await this.knex<InsertUserInterface>(TABLES.USERS)
      .insert(data)
      .onConflict('telegramId')
      .ignore()
      .returning('*');

    return this.findUserByTelegramId({
      telegramId: data.telegramId,
    });
  }

  public async findUserByTelegramId(
    data: TelegramIdInterface,
  ): Promise<UserInterface> {
    return this.knex<UserInterface>(TABLES.USERS)
      .select()
      .where({ telegramId: data.telegramId })
      .first();
  }
}
