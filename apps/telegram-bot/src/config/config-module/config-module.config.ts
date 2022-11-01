import { ConfigModuleOptions } from '@nestjs/config';

export const ConfigModuleConfig: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.env',
};
