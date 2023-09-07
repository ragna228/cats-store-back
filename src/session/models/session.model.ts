import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';

export interface SessionCreationAttributes {
  id: number;
  refreshToken: string;
  name: string;
  userId: number;
  createdAt: Date;
}

@Table({ tableName: 'sessions', createdAt: true, updatedAt: false })
export class Session extends Model<SessionCreationAttributes> {
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  refreshToken: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;
}
