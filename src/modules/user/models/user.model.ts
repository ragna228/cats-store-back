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
}
