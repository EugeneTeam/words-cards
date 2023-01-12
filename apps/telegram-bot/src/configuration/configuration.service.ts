import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { ConfigurationRepositoryInterface } from './interfaces/configuration-repository.interface';
import { ConfigurationInterface } from './interfaces/configuration.interface';
import { CreateConfigurationInterface } from './interfaces/create-configuration.interface';
import { UpdateConfigurationInterface } from './interfaces/update-configuration.interface';
import { getDataFromObservableUtil } from '../utils/get-data-from-observable.util';
import { PACKAGE_NAME } from '../config/grpc/grpc.constants';
import { UuidInterface } from '../../../../common/interfaces/uuid.interface';

@Injectable()
export class ConfigurationService implements OnModuleInit {
  private configurationService: ConfigurationRepositoryInterface<ConfigurationInterface>;

  constructor(@Inject(PACKAGE_NAME) private readonly client: ClientGrpc) {}

  public onModuleInit(): void {
    this.configurationService = this.client.getService<
      ConfigurationRepositoryInterface<ConfigurationInterface>
    >('ConfigurationService');
  }

  public async create(
    data: CreateConfigurationInterface,
  ): Promise<ConfigurationInterface> {
    const observable: Observable<ConfigurationInterface> =
      await this.configurationService.create(data);
    return getDataFromObservableUtil<ConfigurationInterface>(observable);
  }

  public async update(
    configUuid: string,
    data: UpdateConfigurationInterface,
  ): Promise<ConfigurationInterface> {
    const observable: Observable<ConfigurationInterface> =
      await this.configurationService.update(configUuid, data);
    return getDataFromObservableUtil<ConfigurationInterface>(observable);
  }

  public async findOneByUserUuid(
    data: UuidInterface,
  ): Promise<ConfigurationInterface> {
    const observable: Observable<ConfigurationInterface> =
      await this.configurationService.findOneByUserUuid(data);
    return getDataFromObservableUtil<ConfigurationInterface>(observable);
  }
}
