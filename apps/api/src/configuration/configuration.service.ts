import { Inject, Injectable } from '@nestjs/common';
import { CONFIGURATION_REPOSITORY_TOKEN } from './constants/configuration-repository-token.constant';
import { ConfigurationRepositoryInterface } from './interfaces/configuration-repository.interface';
import { ConfigurationInterface } from './interfaces/configuration.interface';
import { CreateConfigurationInterface } from './interfaces/create-configuration.interface';
import { UpdateConfigurationInterface } from './interfaces/update-configuration.interface';
import { UuidInterface } from '../../../../common/interfaces/uuid.interface';

@Injectable()
export class ConfigurationService {
  constructor(
    @Inject(CONFIGURATION_REPOSITORY_TOKEN)
    private readonly configurationRepository: ConfigurationRepositoryInterface<ConfigurationInterface>,
  ) {}

  public async findOneByUserUuid(
    data: UuidInterface,
  ): Promise<ConfigurationInterface> {
    if (!data?.uuid) {
      return {
        uuid: null,
        defaultLanguageForNewWord: null,
        userUuid: null,
        defaultLanguageForWordTranslation: null,
        isNull: true,
      };
    }

    const result = await this.configurationRepository.findOneByUserUuid(data);
    if (!result) {
      return {
        ...result,
        isNull: true,
      };
    }

    return {
      ...result,
      isNull: false,
    };
  }

  public async create(
    data: CreateConfigurationInterface,
  ): Promise<ConfigurationInterface> {
    return this.configurationRepository.create(data);
  }

  public async update(
    configUuid: string,
    data: UpdateConfigurationInterface,
  ): Promise<ConfigurationInterface> {
    return this.configurationRepository.update(configUuid, data);
  }
}
