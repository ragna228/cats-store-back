import { AccessDto } from '../modules/session/dto/access.dto';
import { Session } from '../modules/session/models/session.model';
import { SuccessOperationDto } from '../utils/success-operation.dto';
import { RefreshDto } from '../modules/session/dto/refresh.dto';

export abstract class ISessionService {
  abstract refreshToken(dto: RefreshDto): Promise<AccessDto>;
  abstract removeToken(
    userId: number,
    sessionName: string,
  ): Promise<SuccessOperationDto>;
  abstract getUserSessions(userId: number): Promise<Session[]>;
}
