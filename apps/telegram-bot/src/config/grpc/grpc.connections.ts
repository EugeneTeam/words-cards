import { ClientsModuleAsyncOptions } from '@nestjs/microservices';

import { PACKAGE_NAME } from './grpc.constants';
import { GrpcConfig } from './grpc.config';

export const GrpcConnections: ClientsModuleAsyncOptions = [
  {
    name: PACKAGE_NAME,
    useClass: GrpcConfig,
  },
];
