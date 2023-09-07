import { Global, Module } from '@nestjs/common';
import { globalConfig } from './modules/global-config';
import { globalDb } from './modules/global-db';
import { globalJwt } from './modules/global-jwt';
import { globalRedis } from './modules/global-redis';
import { CatModule } from './cat/cat.module';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartModule } from './cart/cart.module';
import { RoleModule } from './role/role.module';
import { OrderModule } from './order/order.module';

@Global()
@Module({
  imports: [
    ...globalConfig,
    ...globalDb,
    ...globalJwt,
    ...globalRedis,
    CatModule,
    SessionModule,
    UserModule,
    CartModule,
    RoleModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
  exports: [SequelizeModule],
})
export class AppModule {}
