import { OmitType, PartialType } from '@nestjs/swagger';
import { UserCreationAttributes } from '../models/user.model';

export class UpdateUserDto extends OmitType(
  PartialType(UserCreationAttributes),
  ['sessions', 'id', 'verifyId', 'email'],
) {}
