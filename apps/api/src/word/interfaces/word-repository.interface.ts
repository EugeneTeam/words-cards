import { Knex } from 'knex';
import Transaction = Knex.Transaction;
import { CreateWordFullDataInterface } from './create-word-full-data.interface';

export interface WordRepositoryInterface<Word> {
  createOneWordInTransaction(
    data: CreateWordFullDataInterface,
    transaction: Transaction,
  ): Promise<Word>;
}
