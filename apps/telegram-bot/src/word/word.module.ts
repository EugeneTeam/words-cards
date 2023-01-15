import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { GrpcConnections } from '../config/grpc/grpc.connections';
import { WordService } from './word.service';

@Module({
  imports: [ClientsModule.registerAsync(GrpcConnections)],
  providers: [WordService],
  exports: [WordService],
})
export class WordModule {}
