import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { KnexModuleOptions, KnexOptionsFactory } from 'nest-knexjs';

@Injectable()
export class KnexConfig implements KnexOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createKnexOptions(): Promise<KnexModuleOptions> | KnexModuleOptions {
    return {
      config: {
        client: 'postgres',
        connection: {
          host: this.configService.get<string>('POSTGRES_HOST'),
          user: this.configService.get<string>('POSTGRES_USER'),
          password: this.configService.get<string>('POSTGRES_PASSWORD'),
          database: this.configService.get<string>('POSTGRES_DB'),
          port: this.configService.get<number>('POSTGRES_PORT'),
        },
      },
    };
  }
}
