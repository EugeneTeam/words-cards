import { Injectable } from '@nestjs/common';
import { ConfigurationRepositoryInterface } from './interfaces/configuration-repository.interface';
import { ConfigurationInterface } from './interfaces/configuration.interface';
import { CreateConfigurationInterface } from './interfaces/create-configuration.interface';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { UpdateConfigurationInterface } from './interfaces/update-configuration.interface';
import { UuidInterface } from '../../../../common/interfaces/uuid.interface';
import { TABLES } from '../../../../common/constants/tables-names.constant';

@Injectable()
export class ConfigurationRepository
  implements ConfigurationRepositoryInterface<ConfigurationInterface>
{
  constructor(@InjectModel() private readonly knex: Knex) {}

  public async findOneByUserUuid(
    data: UuidInterface,
  ): Promise<ConfigurationInterface> {
    return this.knex<ConfigurationInterface>(TABLES.CONFIGURATION)
      .leftJoin(
        'Languages AS forNewWord',
        `${TABLES.CONFIGURATION}.defaultLanguageForNewWord`,
        '=',
        'forNewWord.uuid',
      )
      .select('forNewWord.iso AS defaultLanguageForNewWord')
      .leftJoin(
        'Languages AS forTranslation',
        `${TABLES.CONFIGURATION}.defaultLanguageForWordTranslation`,
        '=',
        'forTranslation.uuid',
      )
      .select('forTranslation.iso AS defaultLanguageForWordTranslation')
      .where('userUuid', data.uuid)
      .select('Configurations.useDefaultLanguage')
      .first();
  }

  public async create(
    data: CreateConfigurationInterface,
  ): Promise<ConfigurationInterface> {
    return this.knex<CreateConfigurationInterface>(TABLES.CONFIGURATION)
      .insert(data)
      .returning('*')
      .into(TABLES.CONFIGURATION);
  }

  public async update(
    configUuid: string,
    data: UpdateConfigurationInterface,
  ): Promise<ConfigurationInterface> {
    return this.knex<ConfigurationInterface>(TABLES.CONFIGURATION)
      .update({
        ...(data?.defaultLanguageForNewWord && {
          defaultLanguageForNewWord: data?.defaultLanguageForNewWord,
        }),
        ...(data?.defaultLanguageForWordTranslation && {
          defaultLanguageForWordTranslation:
            data?.defaultLanguageForWordTranslation,
        }),
      })
      .where({
        uuid: configUuid,
      })
      .returning('*')
      .into('Configurations');
  }
}
