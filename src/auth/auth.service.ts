import { BadRequestException, Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/registration-dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthorizeUserDto } from './dto/authorize-user.dto';
import { IAuthService } from '../utils/serivces/i-auth.service';
import { IUserService } from '../utils/serivces/i-user.service';
import { ISessionService } from '../utils/serivces/i-session.service';
import { IRoleService } from '../utils/serivces/i-role.service';

@Injectable()
export class AuthService extends IAuthService {
  constructor(
    private userService: IUserService,
    private jwtService: JwtService,
    private sessionService: ISessionService,
    private roleService: IRoleService,
  ) {
    super();
  }

  async registration(dto: RegistrationDto) {
    const hashPassword = await bcrypt.hash(dto.password, 5);

    const user = await this.userService.create({
      ...dto,
      password: hashPassword,
      roles: [await this.roleService.getOrCreate('USER')],
    });

    return this.sessionService.generateTokens(user, dto.sessionName);
  }
  async authorize(dto: AuthorizeUserDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) {
      throw new BadRequestException({
        message: 'Пользователя с данными логином и паролем не существует',
      });
    }

    const passwordEquals = bcrypt.compare(dto.password, user.password);
    if (!passwordEquals) {
      throw new BadRequestException({
        message: 'Пользователя с данными логином и паролем не существует',
      });
    }

    return this.sessionService.generateTokens(user, dto.sessionName);
  }

  async logout(userId: number, sessionName: string) {
    return this.sessionService.removeToken(userId, sessionName);
  }
}
