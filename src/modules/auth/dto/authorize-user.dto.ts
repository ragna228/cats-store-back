import { SessionDto } from '../../session/dto/session.dto';
import { IntersectionType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class AuthorizeUserDto extends IntersectionType(
  SessionDto,
  PickType(CreateUserDto, ['email', 'password'] as const),
) {}
