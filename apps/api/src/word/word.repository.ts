import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { TABLES } from '../../../../common/constants/tables-names.constant';
import { WordRepositoryInterface } from './interfaces/word-repository.interface';
import { WordInterface } from './interfaces/word.interface';

@Injectable()
export class WordRepository implements WordRepositoryInterface<WordInterface> {
  constructor(@InjectModel() private readonly knex: Knex<WordInterface>) {}

  public async createOne(data: any): Promise<WordInterface> {
    return this.knex<WordInterface>(TABLES.WORDS)
      .insert(data)
      .select(
        'uuid',
        'word',
        'note',
        'originalLanguageUuid',
        'categoryUuid',
        'userUuid',
      );
  }
}
