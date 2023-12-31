import { Global, Module } from '@nestjs/common';
import { globalDb } from './global/global-db';
import { SequelizeModule } from '@nestjs/sequelize';
import { globalMulter } from './global/global-multer';
import { MulterModule } from '@nestjs/platform-express';
import { allModules, extraModules } from './modules/info';
import { globalConfig } from './global/global-config';
import { globalMailer } from './global/global-mailer';

@Global()
@Module({
  imports: [
    ...globalConfig,
    ...globalDb,
    ...globalMailer,
    ...globalMulter,
    ...allModules,
    ...extraModules,
  ],
  controllers: [],
  providers: [],
  exports: [SequelizeModule, MulterModule],
})
export class AppModule {}
