import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleConfig } from './config/config-module/config-module.config';
import { GrpcConnections } from './config/grpc/grpc.connections';
import { KnexModule } from 'nest-knexjs';
import { KnexConfig } from './config/knex/knex.config';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleConfig),
    ClientsModule.registerAsync(GrpcConnections),
    KnexModule.forRootAsync({
      useClass: KnexConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
