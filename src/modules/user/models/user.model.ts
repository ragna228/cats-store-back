import {
  BelongsTo,
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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserCreationAttributes {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  id: number;
  @ApiProperty({
    example: 'test',
    description: 'Имя',
  })
  userName: string;
  @ApiProperty({
    example: 'asd',
    description: 'Пароль',
  })
  password: string;
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'E-mail',
  })
  email: string;

  @ApiProperty({
    example: [],
    description: 'Роли',
  })
  roles: Role[];

  @ApiProperty({
    example: [],
    description: 'Сессии',
  })
  sessions: Session[];

  @ApiPropertyOptional({
    example: 1,
    description: 'Id верификации',
  })
  verifyId?: number;
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

  @BelongsTo(() => VerifyCode, 'verifyId')
  verifyCode?: VerifyCode;

  @HasMany(() => Order, 'userId')
  orders: Order[];
}
