import { UserCreationAttributes } from '../models/user.model';
import { OmitType } from '@nestjs/swagger';

export class CreateUserDto extends OmitType(UserCreationAttributes, [
  'sessions',
  'id',
  'verifyId',
]) {}
