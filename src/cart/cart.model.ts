import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Cat } from '../cat/cat.model';
import { CartCat } from './cart-cat.model';

export interface CartCreationAttributes {
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
