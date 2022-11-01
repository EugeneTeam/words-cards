import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ApiModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:5001',
        package: 'hero',
        protoPath: join(__dirname, 'hero/hero.proto'),
      },
    },
  );

  await app.listen();
}
bootstrap();