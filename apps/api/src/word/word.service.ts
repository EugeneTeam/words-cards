import { Inject, Injectable } from '@nestjs/common';
import { WORD_REPOSITORY_KEY } from './constants/word-repository-key.constant';
import { WordRepositoryInterface } from './interfaces/word-repository.interface';
import { WordInterface } from './interfaces/word.interface';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import Transaction = Knex.Transaction;
import { TranslationService } from '../translation/translation.service';
import { StatusInterface } from '../common/interfaces/status.interface';
import { ConfigurationService } from '../configuration/configuration.service';
import { ConfigurationInterface } from '../configuration/interfaces/configuration.interface';
import { CreateWordInputDataInterface } from './interfaces/create-word-input-data.interface';

@Injectable()
export class WordService {
  constructor(
    @Inject(WORD_REPOSITORY_KEY)
    private readonly wordRepository: WordRepositoryInterface<WordInterface>,
    private readonly translationService: TranslationService,
    @InjectModel() private readonly knex: Knex<WordInterface>,
    private readonly configurationService: ConfigurationService,
  ) {}

  public async createOneWordInTransaction(
    data: CreateWordInputDataInterface,
  ): Promise<StatusInterface> {
    const { word, translations, userUuid } = data;
    return new Promise(async (resolve, reject) => {
      await this.knex
        .transaction(async (transaction: Transaction) => {
          const configuration: ConfigurationInterface =
            await this.configurationService.findOneByUserUuid({
              uuid: userUuid,
            });

          const newWord = await this.wordRepository.createOneWordInTransaction(
            {
              ...word,
              userUuid,
              originalLanguageUuid:
                configuration.defaultLanguageForNewWord.uuid,
            },
            transaction,
          );

          await this.translationService.createManyInTransaction(
            {
              translations: translations.translations,
              wordUuid: newWord.uuid,
              originalLanguageUuid:
                configuration.defaultLanguageForWordTranslation.uuid,
            },
            transaction,
          );
        })
        .then(() =>
          resolve({
            status: true,
          }),
        )
        .catch((error) => {
          console.error(error);
          reject({
            status: false,
          });
        });
    });
  }
}
