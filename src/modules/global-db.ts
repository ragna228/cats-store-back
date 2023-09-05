import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/user.model';
import { Session } from '../session/session.model';
import { Cat } from '../cat/cat.model';
import { CartCat } from '../cart/cart-cat.model';
import { Cart } from '../cart/cart.model';

export const globalDb = [
  SequelizeModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        dialect: 'postgres',
        host: configService.get('DATABASE_HOST'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE'),
        models: [User, Session, Cat, CartCat, Cart],
        sync: { force: true },
        autoLoadModels: true,
      };
    },
  }),
];
