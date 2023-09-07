import { CreateSessionDto } from '../../session/dto/create-session.dto';

export type AuthorizeUserDto = CreateSessionDto & {
  email: string;
  password: string;
};
