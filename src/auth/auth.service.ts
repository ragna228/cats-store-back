import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegistrationDto } from './dto/registration-dto';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from '../session/session.service';
import { AuthorizeUserDto } from './dto/authorize-user.dto';
import { SessionDto } from '../session/dto/session.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private sessionService: SessionService,
  ) {}

  async registration(dto: RegistrationDto) {
    const hashPassword = await bcrypt.hash(dto.password, 5);

    const user = await this.userService.create({
      ...dto,
      password: hashPassword,
    });

    return this.sessionService.generateTokens(user, dto.sessionName);
  }
  async authorize(dto: AuthorizeUserDto) {
    const hashPassword = await bcrypt.hash(dto.password, 5);

    const user = await this.userService.getByAuthInfo({
      ...dto,
      password: hashPassword,
    });

    if (!user) {
      throw new BadRequestException({
        message: 'Пользователя с данными логином и паролем не существует',
      });
    }

    return this.sessionService.generateTokens(user, dto.sessionName);
  }

  async logout(dto: SessionDto, user: User) {
    return this.sessionService.removeToken(dto, user);
  }
}
