import { CreateUserDto } from '../../user/dto/create-user.dto';
import { SessionDto } from '../../session/dto/session.dto';

export type RegistrationDto = CreateUserDto & SessionDto;
