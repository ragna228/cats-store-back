import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { ICartService } from '../../interfaces/i-cart.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartCat } from './models/cart-cat.model';
import { Cart } from './models/cart.model';
import { Cat } from '../cat/models/cat.model';

@Module({
  imports: [SequelizeModule.forFeature([Cart, CartCat, Cat])],
  controllers: [CartController],
  providers: [
    {
      provide: ICartService,
      useClass: CartService,
    },
  ],
  exports: [ICartService],
})
export class CartModule {}
