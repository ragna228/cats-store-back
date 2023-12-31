import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cart } from './cart.model';
import { Cat } from '../../cat/models/cat.model';

@Table({ tableName: 'cart-cat', createdAt: false, updatedAt: false })
export class CartCat extends Model<CartCat> {
  id: number;

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cartId: number;

  @ForeignKey(() => Cat)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  catId: number;

  @BelongsTo(() => Cart, 'cartId')
  cart: Cart;

  @BelongsTo(() => Cat, 'catId')
  cat: Cat;
}
