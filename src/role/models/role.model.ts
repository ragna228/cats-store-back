import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { UserRole } from './user.role.model';

@Table({ tableName: 'role', createdAt: false, updatedAt: false })
export class Role extends Model<Role> {
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
