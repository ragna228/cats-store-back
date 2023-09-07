import { SessionDto } from '../../session/dto/session.dto';

export type AuthorizeUserDto = SessionDto & {
  email: string;
  password: string;
};
