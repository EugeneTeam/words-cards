import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { TABLES } from '../../../../common/constants/tables-names.constant';
import { WordFileRepositoryInterface } from './interfaces/word-file-repository.interface';
import { WordFileInterface } from './interfaces/word-file.interface';
import { CreateWordFileInterface } from './interfaces/create-word-file.interface';

@Injectable()
export class WordFileRepository
  implements WordFileRepositoryInterface<WordFileInterface>
{
  constructor(@InjectModel() private readonly knex: Knex<WordFileInterface>) {}

  public async addFileToWord(
    data: CreateWordFileInterface,
  ): Promise<WordFileInterface> {
    const result = await this.knex<WordFileInterface>(TABLES.WORD_FILES).insert(
      data,
      '*',
    );
    return result[0];
  }
}
