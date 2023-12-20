import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { ApiProperty } from '@nestjs/swagger';

export class SessionCreationAttributes {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  id: number;
  @ApiProperty({
    example: 'asd',
    description: 'Refresh токен',
  })
  refreshToken: string;
  @ApiProperty({
    example: 'asd',
    description: 'Имя сессии',
  })
  name: string;
  @ApiProperty({
    example: 1,
    description: 'Id пользователя',
  })
  userId: number;
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
