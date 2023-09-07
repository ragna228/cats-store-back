import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { CartCat } from '../../cart/models/cart-cat.model';
import { Cart } from '../../cart/models/cart.model';
import { OrderCat } from '../../order/models/order-cat.model';
import { Order } from '../../order/models/order.model';

export enum Gender {
  MAN = 'man',
  WOMAN = 'woman',
  OTHER = 'other',
}

export enum CatStatus {
  SHOWED = 'showed',
  SOLD = 'sold',
  DELETED = 'deleted',
}
export interface CatCreationAttributes {
  id: number;
  name: string;
  price: number;
  images: string[];
  gender: Gender;
  age: number;
  colors: string[];
  features: string[];
  status: CatStatus;
  isRecommended: boolean;
}

@Table({ tableName: 'cats', createdAt: true, updatedAt: true })
export class Cat extends Model<CatCreationAttributes> {
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  age: number;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  images: string[];

  @Column({
    type: DataType.ENUM(...Object.values(Gender)),
    allowNull: false,
  })
  gender: Gender;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  colors: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  features: string[];

  @Column({
    type: DataType.ENUM(...Object.values(CatStatus)),
    allowNull: false,
    defaultValue: CatStatus.SHOWED,
  })
  status: CatStatus;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isRecommended: boolean;

  @BelongsToMany(() => Cart, () => CartCat)
  carts: Cart[];

  @BelongsToMany(() => Order, () => OrderCat)
  orders: Order[];
}
