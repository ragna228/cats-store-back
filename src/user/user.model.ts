import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Session } from '../session/session.model';
import { Cart } from '../cart/cart.model';

export interface UserCreationAttributes {
  id: number;
  userName: string;
  password: string;
  createdAt: Date;
}

@Table({ tableName: 'users', createdAt: true, updatedAt: false })
export class User extends Model<UserCreationAttributes> {
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Session, 'userId')
  sessions: Session[];

  @HasMany(() => Cart, 'userId')
  carts: Cart[];
}
