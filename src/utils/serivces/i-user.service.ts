import { User } from '../../user/models/user.model';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { Includeable } from 'sequelize';
import { FilterUserDto } from '../../user/dto/filter-user.dto';

export abstract class IUserService {
  abstract search(dto: FilterUserDto): Promise<User[]>;
  abstract create(dto: CreateUserDto): Promise<User>;
  abstract getByEmail(email: string): Promise<User>;
  abstract getById(id: number, include?: Includeable[]): Promise<User>;
}
