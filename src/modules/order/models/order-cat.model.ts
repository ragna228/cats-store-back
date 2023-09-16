import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from './order.model';
import { Cat } from '../../cat/models/cat.model';

@Table({ tableName: 'order-cat', createdAt: false, updatedAt: false })
export class OrderCat extends Model<OrderCat> {
  id: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderId: number;

  @ForeignKey(() => Cat)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  catId: number;

  @BelongsTo(() => Order, 'orderId')
  order: Order;

  @BelongsTo(() => Cat, 'catId')
  cat: Cat;
}
