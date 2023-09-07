import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Session } from './models/session.model';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/models/user.model';
import { SessionDto } from './dto/session.dto';
import { UserService } from '../user/user.service';
import { TokensDto } from '../auth/dto/tokens.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session) private sessionRepository: typeof Session,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async generateTokens(user: User, sessionName: string): Promise<TokensDto> {
    const { refreshToken } = await this.createNew(user.id, sessionName);
    const { accessToken } = this.generateAccessToken(user, sessionName);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
  generateAccessToken(user: User, sessionName: string) {
    const accessPayload = {
      id: user.id,
      email: user.email,
      userName: user.userName,
      sessionName: sessionName,
    };
    return { accessToken: this.jwtService.sign(accessPayload) };
  }
  async refreshToken(dto: RefreshTokenDto) {
    const currentSession = await this.getByRefreshToken(dto.refreshToken);

    if (!currentSession) {
      throw new BadRequestException({
        message: 'Такого токена нет',
      });
    }

    const { userId, name } = currentSession;

    const user = await this.userService.getById(userId);

    return this.generateAccessToken(user, name);
  }
  async createNew(userId: number, sessionName: string) {
    const refreshPayload = {
      id: userId,
      sessionName: sessionName,
    };

    return this.sessionRepository.create({
      userId: userId,
      name: sessionName,
      refreshToken: this.jwtService.sign(refreshPayload),
    });
  }
  async getByRefreshToken(token: string) {
    return this.sessionRepository.findOne({
      where: {
        refreshToken: token,
      },
    });
  }
  async removeToken(dto: SessionDto, user: User) {
    const count = await this.sessionRepository.destroy({
      where: {
        name: dto.sessionName,
        userId: user.id,
      },
    });

    return {
      success: count == 1,
    };
  }
}
