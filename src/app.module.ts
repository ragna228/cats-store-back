import { Global, Module } from '@nestjs/common';
import { globalDb } from './global/global-db';
import { SequelizeModule } from '@nestjs/sequelize';
import { allModules, extraModules } from './modules/info';
import { globalConfig } from './global/global-config';
import { globalMulter } from './global/global-multer';
import { MulterModule } from '@nestjs/platform-express';

@Global()
@Module({
  imports: [
    ...globalConfig,
    ...globalDb,
    ...allModules,
    ...extraModules,
    ...globalMulter,
  ],
  controllers: [],
  providers: [],
  exports: [SequelizeModule, MulterModule],
})
export class AppModule {}
