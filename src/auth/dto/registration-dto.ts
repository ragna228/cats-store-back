import { CreateUserDto } from '../../user/dto/create-user.dto';
import { SessionDto } from '../../session/dto/session.dto';
import { IntersectionType } from '@nestjs/swagger';

export class RegistrationDto extends IntersectionType(
  CreateUserDto,
  SessionDto,
) {}
