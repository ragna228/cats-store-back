import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Session } from './models/session.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session) private sessionRepository: typeof Session,
    private jwtService: JwtService,
  ) {}
  async generateNewSession(userId: number, sessionName: string) {
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
}
