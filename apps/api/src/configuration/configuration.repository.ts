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
    const result = await this.knex<ConfigurationInterface>(TABLES.CONFIGURATION)
      .leftJoin(
        `${TABLES.LANGUAGES} AS forNewWord`,
        `${TABLES.CONFIGURATION}.defaultLanguageForNewWord`,
        '=',
        'forNewWord.uuid',
      )
      .leftJoin(
        `${TABLES.LANGUAGES} AS forTranslation`,
        `${TABLES.CONFIGURATION}.defaultLanguageForWordTranslation`,
        '=',
        'forTranslation.uuid',
      )
      .where('userUuid', data.uuid)
      .select(
        `${TABLES.CONFIGURATION}.uuid AS uuid`,
        `${TABLES.CONFIGURATION}.userUuid AS userUuid`,
        'forNewWord.uuid AS wordDefaultUuid',
        'forNewWord.name AS wordDefaultName',
        'forTranslation.uuid AS translationDefaultUuid',
        'forTranslation.name AS translationDefaultName',
      )
      .first();
    return {
      uuid: result.uuid,
      userUuid: result.userUuid,
      defaultLanguageForNewWord: {
        name: result.wordDefaultName,
        uuid: result.wordDefaultUuid,
      },
      defaultLanguageForWordTranslation: {
        name: result.translationDefaultName,
        uuid: result.translationDefaultUuid,
      },
    };
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
