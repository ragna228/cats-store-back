import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cart } from '../cart/cart.model';
import { CartCat } from '../cart/cart-cat.model';

export enum Gender {
  MAN = 'man',
  WOMAN = 'woman',
  OTHER = 'other',
}
export interface CatCreationAttributes {
  id: number;
  name: string;
  price: number;
  images: string[];
  gender: Gender;
  colors: string[];
  features: string[];
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

  @BelongsToMany(() => Cart, () => CartCat)
  carts: Cart[];
}
