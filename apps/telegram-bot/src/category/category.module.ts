import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { CategoryService } from './category.service';
import { GrpcConnections } from '../config/grpc/grpc.connections';

@Module({
  imports: [ClientsModule.registerAsync(GrpcConnections)],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
