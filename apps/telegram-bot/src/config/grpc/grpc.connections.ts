import { PACKAGE_NAME } from './grpc.constants';
import { GrpcConfig } from './grpc.config';
import { ClientsModuleAsyncOptions } from '@nestjs/microservices';

export const GrpcConnections: ClientsModuleAsyncOptions = [
  {
    name: PACKAGE_NAME,
    useClass: GrpcConfig,
  },
];
