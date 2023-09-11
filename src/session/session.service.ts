import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Session } from './models/session.model';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/models/user.model';
import { TokensDto } from '../auth/dto/tokens.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { IUserService } from '../utils/serivces/i-user.service';
import { ISessionService } from '../utils/serivces/i-session.service';
import { AccessTokenDto } from './dto/access-token.dto';
import { InfoTokenDto } from '../utils/info-token.dto';

@Injectable()
export class SessionService extends ISessionService {
  constructor(
    @InjectModel(Session) private sessionRepository: typeof Session,
    private jwtService: JwtService,
    private userService: IUserService,
  ) {
    super();
  }
  async generateTokens(user: User, sessionName: string): Promise<TokensDto> {
    const session = await this.createNew(user.id, sessionName);
    const { accessToken } = await this.generateAccessToken(user, session);

    return {
      accessToken: accessToken,
      refreshToken: session.refreshToken,
    };
  }
  async generateAccessToken(
    user: User,
    session: Session,
  ): Promise<AccessTokenDto> {
    const accessPayload: InfoTokenDto = {
      id: user.id,
      email: user.email,
      userName: user.userName,
      sessionName: session.name,
      sessionId: session.id,
    };
    return { accessToken: this.jwtService.sign(accessPayload) };
  }
  async refreshToken(dto: RefreshTokenDto): Promise<AccessTokenDto> {
    const currentSession = await this.getByRefreshToken(dto.refreshToken);

    if (!currentSession) {
      throw new BadRequestException({
        message: 'Такого токена нет',
      });
    }

    const user = await this.userService.getById(currentSession.userId);

    return this.generateAccessToken(user, currentSession);
  }
  async createNew(userId: number, sessionName: string): Promise<Session> {
    const candidate = await this.sessionRepository.findOne({
      where: {
        userId: userId,
        name: sessionName,
      },
    });

    console.log(candidate);

    if (candidate) {
      throw new BadRequestException({
        message: 'Такая сессия уже существует',
      });
    }

    const refreshPayload = {
      id: userId,
      sessionName: sessionName,
    };

    return this.sessionRepository.create({
      userId: userId,
      name: sessionName,
      refreshToken: this.jwtService.sign(refreshPayload, {
        expiresIn: '10d',
      }),
    });
  }
  async getByRefreshToken(token: string): Promise<Session> {
    return this.sessionRepository.findOne({
      where: {
        refreshToken: token,
      },
    });
  }
  async removeToken(userId: number, sessionName: string) {
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
}
