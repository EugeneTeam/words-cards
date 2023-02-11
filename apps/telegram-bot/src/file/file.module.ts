import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { FileService } from './file.service';
import { GrpcConnections } from '../config/grpc/grpc.connections';
import { AppService } from '../app.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ClientsModule.registerAsync(GrpcConnections), HttpModule],
  providers: [FileService, AppService],
  exports: [FileService],
})
export class FileModule {}
