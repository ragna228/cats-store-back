import { CreateUserDto } from '../../user/dto/create-user.dto';
import { CreateSessionDto } from '../../session/dto/create-session.dto';

export type RegistrationDto = CreateUserDto & CreateSessionDto;
