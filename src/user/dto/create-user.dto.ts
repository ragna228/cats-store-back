import { UserCreationAttributes } from '../models/user.model';

export type CreateUserDto = Omit<UserCreationAttributes, 'id'>;
