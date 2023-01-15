import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { TABLES } from '../../../../common/constants/tables-names.constant';
import { TranslationRepositoryInterface } from './interfaces/translation-repository.interface';
import { TranslationInterface } from './interfaces/translation.interface';
import { CreateTranslationsInterface } from './interfaces/create-translations.interface';
import Transaction = Knex.Transaction;

@Injectable()
export class TranslationRepository
  implements TranslationRepositoryInterface<TranslationInterface>
{
  constructor(
    @InjectModel() private readonly knex: Knex<TranslationInterface>,
  ) {}

  public async createManyInTransaction(
    data: CreateTranslationsInterface,
    transaction: Transaction,
  ): Promise<TranslationInterface> {
    const normalizeList = data.translations.map((translation: string) => ({
      translate: translation,
      wordUuid: data.wordUuid,
      originalLanguageUuid: data.originalLanguageUuid,
    }));

    return this.knex<TranslationInterface>(TABLES.TRANSLATIONS)
      .transacting(transaction)
      .insert(normalizeList)
      .select('uuid', 'translate', 'wordUuid', 'originalLanguageUuid');
  }
}
