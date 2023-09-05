import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

export const globalRedis = [
  CacheModule.registerAsync({
    useFactory: (configService: ConfigService) => {
      return {
        isGlobal: true,
        url: configService.get('REDIS_URL'),
      };
    },
    inject: [ConfigService],
  }),
];
