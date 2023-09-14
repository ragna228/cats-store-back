import { BadRequestException, Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/registration-dto';
import * as bcrypt from 'bcryptjs';
import { IAuthService } from '../../interfaces/i-auth.service';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/models/user.model';
import { Role } from '../role/models/role.model';
import { AuthorizeUserDto } from './dto/authorize-user.dto';
import { SessionManagerService } from '../extra/session/session-manager.service';
import { VerifyCode } from '../user/models/verify-code.model';
import { MailerService } from '@nestjs-modules/mailer';
import { getMailerConfig } from '../../utils/extentions/mailer.extentions';

@Injectable()
export class AuthService extends IAuthService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Role) private roleRepository: typeof Role,
    @InjectModel(VerifyCode) private codeRepository: typeof VerifyCode,
    private sessionManagerService: SessionManagerService,
    private mailerService: MailerService,
  ) {
    super();
  }

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

    const startRole = await this.roleRepository.findOne({
      where: { name: 'USER' },
    });

    const code = await this.codeRepository.create({
      code: 1000 + Math.floor(Math.random() * 8999),
    });

    try {
      await this.mailerService.sendMail(getMailerConfig(dto.email, code.code));
    } catch (e) {
      await this.codeRepository.destroy({
        where: {
          id: code.id,
        },
      });
      throw new BadRequestException({
        message: 'Такой почты не сущетсвует',
      });
    }

    const user = await this.userRepository.create({
      verifyId: code.id,
      userName: dto.userName,
      email: dto.email,
      password: hashPassword,
      roles: [startRole],
    });

    return this.sessionManagerService.createOrUpdateSession(
      user,
      dto.sessionName,
    );
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

    return this.sessionManagerService.createOrUpdateSession(
      candidate,
      dto.sessionName,
    );
  }

  async logout(userId: number, sessionName: string) {
    return this.sessionManagerService.removeSession(userId, sessionName);
  }
}
