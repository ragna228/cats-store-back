import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { UserRole } from './user.role.model';
import { ApiProperty } from '@nestjs/swagger';

export class RoleCreationAttributes {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  id: number;
  @ApiProperty({
    example: 'asd',
    description: 'Имя',
  })
  name: string;
}
@Table({ tableName: 'role', createdAt: false, updatedAt: false })
export class Role extends Model<RoleCreationAttributes> {
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
