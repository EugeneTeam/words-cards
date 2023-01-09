import { Provider } from '@nestjs/common';
import { CONFIGURATION_REPOSITORY_TOKEN } from '../constants/configuration-repository-token.constant';
import { ConfigurationRepository } from '../configuration.repository';

export const ConfigurationRepositoryProvider: Provider = {
  provide: CONFIGURATION_REPOSITORY_TOKEN,
  useClass: ConfigurationRepository,
};
