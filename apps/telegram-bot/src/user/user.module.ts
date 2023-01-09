import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { UserService } from './user.service';
import { GrpcConnections } from '../config/grpc/grpc.connections';

@Module({
  imports: [ClientsModule.registerAsync(GrpcConnections)],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
