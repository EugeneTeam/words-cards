import { Inject, Injectable } from '@nestjs/common';
import { TRANSLATION_REPOSITORY_KEY } from './constants/translation-repository-key.constant';
import { TranslationRepositoryInterface } from './interfaces/translation-repository.interface';
import { TranslationInterface } from './interfaces/translation.interface';
import { CreateTranslationsInterface } from './interfaces/create-translations.interface';
import { Knex } from 'knex';
import Transaction = Knex.Transaction;

@Injectable()
export class TranslationService {
  constructor(
    @Inject(TRANSLATION_REPOSITORY_KEY)
    private readonly translationRepository: TranslationRepositoryInterface<TranslationInterface>,
  ) {}

  public async createManyInTransaction(
    data: CreateTranslationsInterface,
    transaction: Transaction,
  ): Promise<TranslationInterface> {
    return this.translationRepository.createManyInTransaction(
      data,
      transaction,
    );
  }
}
