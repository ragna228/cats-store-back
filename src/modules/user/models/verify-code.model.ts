import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'verify-code', createdAt: false, updatedAt: false })
export class VerifyCode extends Model<VerifyCode> {
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  code: number;

  @BelongsTo(() => User, 'verifyId')
  user: User;
}
