import { CreateConfigurationInterface } from './create-configuration.interface';
import { UpdateConfigurationInterface } from './update-configuration.interface';
import { UuidInterface } from '../../../../../common/interfaces/uuid.interface';

export interface ConfigurationRepositoryInterface<Configuration> {
  create(data: CreateConfigurationInterface): Promise<Configuration>;
  findOneByUserUuid(data: UuidInterface): Promise<Configuration>;
  update(
    configUuid: string,
    data: UpdateConfigurationInterface,
  ): Promise<Configuration>;
}
