import { CreateTranslationsInterface } from './create-translations.interface';
import { Knex } from 'knex';
import Transaction = Knex.Transaction;

export interface TranslationRepositoryInterface<Translation> {
  createManyInTransaction(
    data: CreateTranslationsInterface,
    transaction: Transaction,
  ): Promise<Translation>;
}
