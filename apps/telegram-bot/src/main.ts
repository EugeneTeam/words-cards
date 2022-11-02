import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = Number(process.env?.PORT) || 3000;

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  await app.listen(port);
}
bootstrap();
