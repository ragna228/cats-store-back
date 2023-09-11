import { User } from '../../user/models/user.model';
import { TokensDto } from '../../auth/dto/tokens.dto';
import { RefreshTokenDto } from '../../session/dto/refresh-token.dto';
import { AccessTokenDto } from '../../session/dto/access-token.dto';
import { Session } from '../../session/models/session.model';
import { SuccessOperationDto } from '../success-operation.dto';

export abstract class ISessionService {
  abstract generateTokens(user: User, sessionName: string): Promise<TokensDto>;
  abstract generateAccessToken(
    user: User,
    session: Session,
  ): Promise<AccessTokenDto>;
  abstract refreshToken(dto: RefreshTokenDto): Promise<AccessTokenDto>;
  abstract createNew(userId: number, sessionName: string): Promise<Session>;
  abstract getByRefreshToken(token: string): Promise<Session>;
  abstract removeToken(
    userId: number,
    sessionName: string,
  ): Promise<SuccessOperationDto>;
  abstract getUserSessions(userId: number): Promise<Session[]>;
}
