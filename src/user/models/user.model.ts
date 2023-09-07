import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cart } from '../../cart/models/cart.model';
import { Role } from '../../role/models/role.model';
import { UserRole } from '../../role/models/user.role.model';
import { Session } from '../../session/models/session.model';
import { VerifyCode } from './verify-code.model';
import { Order } from '../../order/models/order.model';

export interface UserCreationAttributes {
  id: number;
  userName: string;
  password: string;
  email: string;
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
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Session, 'userId')
  sessions: Session[];

  @HasOne(() => Cart, 'userId')
  carts: Cart;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  verifyId?: number;

  @HasOne(() => VerifyCode, 'verifyId')
  verifyCode?: VerifyCode;

  @HasMany(() => Order, 'userId')
  orders: Order[];
}
