import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { IOrderService } from '../../interfaces/i-order.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { Cart } from '../cart/models/cart.model';
import { CartCat } from '../cart/models/cart-cat.model';
import { OrderCat } from './models/order-cat.model';
import { Cat } from '../cat/models/cat.model';

@Module({
  imports: [SequelizeModule.forFeature([Order, Cart, CartCat, OrderCat, Cat])],
  controllers: [OrderController],
  providers: [
    {
      provide: IOrderService,
      useClass: OrderService,
    },
  ],
  exports: [IOrderService],
})
export class OrderModule {}
