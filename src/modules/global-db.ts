import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Cat } from '../cat/models/cat.model';
import { CartCat } from '../cart/models/cart-cat.model';
import { Cart } from '../cart/models/cart.model';
import { User } from '../user/models/user.model';
import { UserRole } from '../role/models/user.role.model';
import { Role } from '../role/models/role.model';
import { Session } from '../session/models/session.model';
import { VerifyCode } from '../user/models/verify-code.model';
import { OrderCat } from '../order/models/order-cat.model';
import { Order } from '../order/models/order.model';
import { globalConfig } from './global-config';

export const globalDb = [
  SequelizeModule.forRootAsync({
    imports: [...globalConfig],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        dialect: 'postgres',
        host: configService.get('DATABASE_HOST'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE'),
        models: [
          User,
          Session,
          Cat,
          CartCat,
          Cart,
          Role,
          UserRole,
          VerifyCode,
          OrderCat,
          Order,
        ],
        //sync: { force: true },
        autoLoadModels: true,
      };
    },
  }),
  SequelizeModule.forFeature([User, UserRole, Role]),
];
