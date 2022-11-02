import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { FileService } from './file.service';
import { GrpcConnections } from '../config/grpc/grpc.connections';

@Module({
  imports: [ClientsModule.registerAsync(GrpcConnections)],
  providers: [FileService],
})
export class FileModule {}
