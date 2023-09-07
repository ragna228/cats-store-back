import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { globalConfig } from './global-config';

export const globalRedis = [
  CacheModule.registerAsync({
    imports: [...globalConfig],
    useFactory: (configService: ConfigService) => {
      return {
        isGlobal: true,
        url: configService.get('REDIS_URL'),
      };
    },
    inject: [ConfigService],
  }),
];
