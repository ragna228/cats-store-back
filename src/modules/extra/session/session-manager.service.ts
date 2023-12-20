import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Session } from '../../session/models/session.model';
import { JwtService } from '../jwt/jwt.service';
import { User } from '../../user/models/user.model';
import { TokensDto } from '../jwt/tokens.dto';
import { SuccessOperationDto } from '../../../utils/success-operation.dto';

@Injectable()
export class SessionManagerService {
  constructor(
    @InjectModel(Session) private sessionRepository: typeof Session,
    private jwtService: JwtService,
  ) {}
  async createOrUpdateSession(
    user: User,
    sessionName: string,
    ifExists: 'error' | 'update' = 'update',
  ): Promise<TokensDto> {
    const { id, refreshToken } = await this.get(user, sessionName, ifExists);

    const accessToken = this.jwtService.generate(
      {
        id: user.id,
        sessionName: sessionName,
        email: user.email,
        userName: user.userName,
        sessionId: id,
      },
      'access',
    );

    return {
      refreshToken: refreshToken,
      accessToken: accessToken,
    };
  }

  private async get(
    user: User,
    sessionName: string,
    ifExists: 'error' | 'update',
  ): Promise<Session> {
    const candidate = await this.sessionRepository.findOne({
      where: {
        userId: user.id,
        name: sessionName,
      },
    });

    if (candidate) {
      if (ifExists == 'error')
        throw new BadRequestException({ message: 'Такая сессия уже есть' });
      return candidate;
    }

    const refreshToken = this.jwtService.generate(
      {
        id: user.id,
        sessionName: sessionName,
      },
      'refresh',
    );

    return await this.sessionRepository.create({
      userId: user.id,
      name: sessionName,
      refreshToken: refreshToken,
    });
  }
  async removeSession(
    userId: number,
    sessionName: string,
  ): Promise<SuccessOperationDto> {
    const count = await this.sessionRepository.destroy({
      where: {
        name: sessionName,
        userId: userId,
      },
    });

    return {
      success: count == 1,
    };
  }
}
