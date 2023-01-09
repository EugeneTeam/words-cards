import { Injectable } from '@nestjs/common';
import { LanguageRepositoryInterface } from './interfaces/language-repository.interface';
import { LanguageInterface } from './interfaces/language.interface';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { TABLES } from '../../../../common/constants/tables-names.constant';
import { LanguagesInterface } from './interfaces/languages.interface';

@Injectable()
export class LanguageRepository
  implements LanguageRepositoryInterface<LanguageInterface>
{
  constructor(@InjectModel() private readonly knex: Knex<LanguageInterface>) {}

  public async getOneByIso(iso: string): Promise<LanguageInterface> {
    return this.knex<LanguageInterface>(TABLES.LANGUAGES)
      .where({ iso })
      .first();
  }

  public async findAllLanguages(): Promise<LanguagesInterface> {
    const languages = await this.knex<LanguageInterface>(
      TABLES.LANGUAGES,
    ).returning('*');
    return {
      languages,
    };
  }
}
