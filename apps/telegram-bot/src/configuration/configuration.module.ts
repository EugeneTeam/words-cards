import { Module } from '@nestjs/common';

import { ConfigurationService } from './configuration.service';
import { ClientsModule } from '@nestjs/microservices';
import { GrpcConnections } from '../config/grpc/grpc.connections';

@Module({
  imports: [ClientsModule.registerAsync(GrpcConnections)],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
