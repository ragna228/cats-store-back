import { BadRequestException, Injectable } from '@nestjs/common';
import { IOrderService } from '../../interfaces/i-order.service';
import { RowDto } from '../../utils/row.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { rowed } from '../../utils/extentions/shared.extentions';
import { Cat, CatStatus } from '../cat/models/cat.model';
import { Cart } from '../cart/models/cart.model';
import { CartCat } from '../cart/models/cart-cat.model';
import { OrderCat } from './models/order-cat.model';

@Injectable()
export class OrderService extends IOrderService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    @InjectModel(Cart) private cartRepository: typeof Cart,
    @InjectModel(CartCat) private cartCatRepository: typeof CartCat,
    @InjectModel(Cat) private catRepository: typeof Cat,
    @InjectModel(OrderCat) private orderCatRepository: typeof OrderCat,
  ) {
    super();
  }
  async buyCart(userId: number): Promise<Order> {
    const cart = await this.cartRepository.findOne({
      where: {
        userId: userId,
      },
      include: [Cat],
    });
    const cats = cart.cats.filter((e) => e.status == CatStatus.SHOWED);

    if (cats.length == 0) {
      throw new BadRequestException({
        message: 'Ваша корзина пуста',
      });
    }

    const { id } = await this.orderRepository.create({
      userId: userId,
    });

    for (const cat of cats) {
      await this.orderCatRepository.create({
        orderId: id,
        catId: cat.id,
      });
      await this.catRepository.update(
        {
          status: CatStatus.SOLD,
        },
        {
          where: {
            id: cat.id,
          },
        },
      );
    }
    await this.cartCatRepository.destroy({
      where: {
        cartId: cart.id,
      },
    });

    return this.orderRepository.findOne({
      where: {
        id: id,
      },
      include: [Cat],
    });
  }

  getAll(dto: RowDto): Promise<Order[]> {
    return this.orderRepository.findAll(
      rowed<Order>(dto.row, {
        include: [Cat],
      }),
    );
  }

  history(userId: number): Promise<Order[]> {
    return this.orderRepository.findAll({
      where: {
        userId: userId,
      },
      include: [Cat],
    });
  }
}
