import { Global, Module } from '@nestjs/common';
import { globalConfig } from './modules/global-config';
import { globalDb } from './modules/global-db';
import { globalJwt } from './modules/global-jwt';
import { globalRedis } from './modules/global-redis';

@Global()
@Module({
  imports: [...globalConfig, ...globalDb, ...globalJwt, ...globalRedis],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
