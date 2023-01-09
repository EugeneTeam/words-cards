import { Module } from '@nestjs/common';

import { ClientsModule } from '@nestjs/microservices';
import { GrpcConnections } from '../config/grpc/grpc.connections';
import { LanguageService } from './language.service';

@Module({
  imports: [ClientsModule.registerAsync(GrpcConnections)],
  providers: [LanguageService],
  exports: [LanguageService],
})
export class LanguageModule {}
