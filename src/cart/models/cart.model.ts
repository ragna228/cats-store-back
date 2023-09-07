import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { CartCat } from './cart-cat.model';
import { Cat } from '../../cat/models/cat.model';
import { User } from '../../user/models/user.model';

export class CartCreationAttributes {
  id: number;
  userId: number;
  createdAt: Date;
}

@Table({ tableName: 'carts', createdAt: true, updatedAt: false })
export class Cart extends Model<CartCreationAttributes> {
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsToMany(() => Cat, () => CartCat)
  cats: Cat[];

  @BelongsTo(() => User)
  user: User;
}
