import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { Cat } from '../../cat/models/cat.model';
import { OrderCat } from './order-cat.model';

@Table({ tableName: 'order', createdAt: true, updatedAt: true })
export class Order extends Model<Order> {
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @BelongsToMany(() => Cat, () => OrderCat)
  cats: Cat[];
}
