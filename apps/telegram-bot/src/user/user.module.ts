import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { UserService } from './user.service';
import { GrpcConnections } from '../config/grpc/grpc.connections';
import { StartAction } from '../actions/start.action';

@Module({
  imports: [ClientsModule.registerAsync(GrpcConnections)],
  providers: [UserService, StartAction],
})
export class UserModule {}
