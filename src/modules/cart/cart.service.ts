import { BadRequestException, Injectable } from '@nestjs/common';
import { ICartService } from '../../interfaces/i-cart.service';
import { SuccessOperationDto } from '../../utils/success-operation.dto';
import { Cart } from './models/cart.model';
import { InjectModel } from '@nestjs/sequelize';
import { CartCat } from './models/cart-cat.model';
import { Cat } from '../cat/models/cat.model';
import { availableCats } from '../../utils/extentions/cats.extention';

@Injectable()
export class CartService extends ICartService {
  constructor(
    @InjectModel(Cart) private cartRepository: typeof Cart,
    @InjectModel(CartCat) private cartCatRepository: typeof CartCat,
    @InjectModel(Cat) private catRepository: typeof Cat,
  ) {
    super();
  }
  async addToCart(catId: number, userId: number): Promise<SuccessOperationDto> {
    const cart = await this.cartRepository.findOne({
      where: {
        userId: userId,
      },
      include: [Cat],
    });

    if (cart.cats.find((e) => e.id == catId)) {
      throw new BadRequestException({
        message: 'Такой кот уже есть в корзине',
      });
    }

    const cat = await this.catRepository.findOne({
      where: availableCats({
        id: catId,
      }),
    });

    if (!cat) {
      throw new BadRequestException({
        message: 'Такого кота нет или он уже куплен',
      });
    }

    await this.cartCatRepository.create({
      catId: cat.id,
      cartId: cart.id,
    });

    return {
      success: true,
    };
  }

  async clear(userId: number): Promise<SuccessOperationDto> {
    const cart = await this.cartRepository.findOne({
      where: {
        userId: userId,
      },
    });
    await this.cartCatRepository.destroy({
      where: {
        cartId: cart.id,
      },
    });

    return { success: true };
  }

  async getAll(userId: number): Promise<Cat[]> {
    const cart = await this.cartRepository.findOne({
      where: {
        userId: userId,
      },
      include: [Cat],
    });
    return cart.cats;
  }

  async removeFromCart(
    catId: number,
    userId: number,
  ): Promise<SuccessOperationDto> {
    const cart = await this.cartRepository.findOne({
      where: {
        userId: userId,
      },
      include: [Cat],
    });

    if (!cart.cats.find((e) => e.id == catId)) {
      throw new BadRequestException({
        message: 'Такой кота нет в корзине',
      });
    }

    await this.cartCatRepository.destroy({
      where: {
        catId: catId,
        cartId: cart.id,
      },
    });

    return {
      success: true,
    };
  }
}
