import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { CartCat } from '../../cart/models/cart-cat.model';
import { Cart } from '../../cart/models/cart.model';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../order/models/order.model';
import { OrderCat } from '../../order/models/order-cat.model';

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
export class CatCreationAttributes {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  id: number;
  @ApiProperty({
    example: 'asd',
    description: 'Имя',
  })
  name: string;
  @ApiProperty({
    example: 100,
    description: 'Цена',
  })
  price: number;
  @ApiProperty({
    example: ['img.png'],
    description: 'Изображения',
  })
  images: string[];
  @ApiProperty({
    example: Gender.MAN,
    description: 'Гендер кота',
  })
  gender: Gender;
  @ApiProperty({
    example: 10,
    description: 'Возраст',
  })
  age: number;
  @ApiProperty({
    example: 'asd',
    description: 'Цвет',
  })
  color: string;
  @ApiProperty({
    example: ['Цвет'],
    description: 'Особенности',
  })
  features: string[];
  @ApiProperty({
    example: CatStatus.SOLD,
    description: 'Статус кота',
  })
  status: CatStatus;
  @ApiProperty({
    example: true,
    description: 'Рекомендован',
  })
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
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

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
