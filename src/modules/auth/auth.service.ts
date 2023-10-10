import { BadRequestException, Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/registration-dto';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/models/user.model';
import { AuthorizeUserDto } from './dto/authorize-user.dto';
import {SessionManagerService} from "../extra/session/session-manager.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private sessionManagerService: SessionManagerService,
  ) {}

  async registration(dto: RegistrationDto) {
    const candidate = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (candidate) {
      throw new BadRequestException({
        message: 'Такой пользователь уже существует',
      });
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);


    const user = await this.userRepository.create({
      userName: dto.userName,
      email: dto.email,
      password: hashPassword,
    });

    return this.sessionManagerService.create(user);
  }
  async authorize(dto: AuthorizeUserDto) {
    const candidate = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (!candidate) {
      throw new BadRequestException({
        message: 'Пользователя с данными логином и паролем не существует',
      });
    }

    const passwordEquals = bcrypt.compare(dto.password, candidate.password);
    if (!passwordEquals) {
      throw new BadRequestException({
        message: 'Пользователя с данными логином и паролем не существует',
      });
    }

    return this.sessionManagerService.create(candidate);
  }
}
