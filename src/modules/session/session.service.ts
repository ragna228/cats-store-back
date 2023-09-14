import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Session } from './models/session.model';
import { RefreshDto } from './dto/refresh.dto';
import { AccessDto } from './dto/access.dto';
import { User } from '../user/models/user.model';
import { ISessionService } from '../../interfaces/i-session.service';
import { SessionManagerService } from '../extra/session/session-manager.service';
import { SuccessOperationDto } from '../../utils/success-operation.dto';

@Injectable()
export class SessionService extends ISessionService {
  constructor(
    @InjectModel(Session) private sessionRepository: typeof Session,
    private sessionManagerService: SessionManagerService,
  ) {
    super();
  }
  async refreshToken(dto: RefreshDto): Promise<AccessDto> {
    const currentSession = await this.sessionRepository.findOne({
      where: {
        refreshToken: dto.refreshToken,
      },
      include: [User],
    });

    if (!currentSession) {
      throw new BadRequestException({
        message: 'Такого токена нет',
      });
    }

    const { accessToken } =
      await this.sessionManagerService.createOrUpdateSession(
        currentSession.user,
        currentSession.name,
      );

    return { accessToken: accessToken };
  }

  async getUserSessions(userId: number): Promise<Session[]> {
    return this.sessionRepository.findAll({
      where: {
        userId: userId,
      },
      attributes: {
        exclude: ['refreshToken', 'userId'],
      },
    });
  }

  removeToken(
    userId: number,
    sessionName: string,
  ): Promise<SuccessOperationDto> {
    return this.sessionManagerService.removeSession(userId, sessionName);
  }
}
