import { Injectable } from '@nestjs/common';
import { ClientsModuleOptionsFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { GrpcOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';

@Injectable()
export class GrpcConfig implements ClientsModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createClientOptions(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        url: this.configService.getOrThrow<string>('API_URL'),
        package: 'proto',
        protoPath: join(__dirname, 'proto/index.proto'),
      },
    };
  }
}
