import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { WordFileService } from './word-file.service';
import { GrpcConnections } from '../config/grpc/grpc.connections';

@Module({
  imports: [ClientsModule.registerAsync(GrpcConnections)],
  providers: [WordFileService],
  exports: [WordFileService],
})
export class WordFileModule {}
