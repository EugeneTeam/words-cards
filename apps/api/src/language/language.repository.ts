import { Injectable } from '@nestjs/common';
import { LanguageRepositoryInterface } from './interfaces/language-repository.interface';
import { LanguageInterface } from './interfaces/language.interface';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { TABLES } from '../../../../common/constants/tables-names.constant';

@Injectable()
export class LanguageRepository
  implements LanguageRepositoryInterface<LanguageInterface>
{
  constructor(@InjectModel() private readonly knex: Knex<LanguageInterface>) {}

  public getOneByIso(iso: string): Promise<LanguageInterface> {
    return this.knex(TABLES.LANGUAGES).where({ iso }).first();
  }
}
