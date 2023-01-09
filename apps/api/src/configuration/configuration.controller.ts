import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ConfigurationService } from './configuration.service';
import { ConfigurationInterface } from './interfaces/configuration.interface';
import { CreateConfigurationInterface } from './interfaces/create-configuration.interface';
import { UpdateConfigurationInterface } from './interfaces/update-configuration.interface';
import { UuidInterface } from '../../../../common/interfaces/uuid.interface';

@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @GrpcMethod('ConfigurationService', 'FindOneByUserUuid')
  async findOneByUserUuid(
    data: UuidInterface,
  ): Promise<ConfigurationInterface> {
    return this.configurationService.findOneByUserUuid(data);
  }

  @GrpcMethod('ConfigurationService', 'UpdateConfiguration')
  async update(
    configUuid: string,
    data: UpdateConfigurationInterface,
  ): Promise<ConfigurationInterface> {
    return this.configurationService.update(configUuid, data);
  }

  @GrpcMethod('ConfigurationService', 'CreateConfiguration')
  async create(
    data: CreateConfigurationInterface,
  ): Promise<ConfigurationInterface> {
    return this.configurationService.create(data);
  }
}
