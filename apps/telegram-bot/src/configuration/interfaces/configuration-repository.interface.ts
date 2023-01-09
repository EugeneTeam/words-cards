import { Observable } from 'rxjs';
import { CreateConfigurationInterface } from './create-configuration.interface';
import { UpdateConfigurationInterface } from './update-configuration.interface';
import { UuidInterface } from '../../../../../common/interfaces/uuid.interface';

export interface ConfigurationRepositoryInterface<Configuration> {
  create(data: CreateConfigurationInterface): Observable<Configuration>;
  findOneByUserUuid(data: UuidInterface): Observable<Configuration>;
  update(
    configUuid: string,
    data: UpdateConfigurationInterface,
  ): Observable<Configuration>;
}
