import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ConfigurationRepositoryProvider } from './providers/configuration-repository.provider';
import { ConfigurationController } from './configuration.controller';

@Module({
  providers: [ConfigurationService, ConfigurationRepositoryProvider],
  controllers: [ConfigurationController],
})
export class ConfigurationModule {}
