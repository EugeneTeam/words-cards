import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { ApiModule } from './api.module';

async function bootstrap() {
  const url: string = process.env.API_URL;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ApiModule,
    {
      transport: Transport.GRPC,
      options: {
        url,
        package: 'proto',
        protoPath: join(__dirname, 'proto/index.proto'),
      },
    },
  );

  await app.listen();
}
bootstrap();
