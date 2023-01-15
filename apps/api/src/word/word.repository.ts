import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { TABLES } from '../../../../common/constants/tables-names.constant';
import { WordRepositoryInterface } from './interfaces/word-repository.interface';
import { WordInterface } from './interfaces/word.interface';
import Transaction = Knex.Transaction;
import { CreateWordFullDataInterface } from './interfaces/create-word-full-data.interface';

@Injectable()
export class WordRepository implements WordRepositoryInterface<WordInterface> {
  constructor(@InjectModel() private readonly knex: Knex<WordInterface>) {}

  public async createOneWordInTransaction(
    data: CreateWordFullDataInterface,
    transaction: Transaction,
  ): Promise<WordInterface> {
    const result = await this.knex<WordInterface>(TABLES.WORDS)
      .transacting(transaction)
      .insert(data, '*');
    return result[0];
  }
}
