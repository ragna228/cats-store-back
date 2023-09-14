import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Includeable, Op, WhereOptions } from 'sequelize';
import { FilterUserDto } from './dto/filter-user.dto';
import { Role } from '../role/models/role.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from '../../interfaces/i-user.service';
import { roleWithoutMany } from '../../utils/extentions/role.extentions';
import {
  filteredFields,
  rowed,
} from '../../utils/extentions/shared.extentions';
import { SuccessOperationDto } from '../../utils/success-operation.dto';
import { VerifyDto } from './dto/verify-dto';
import { MailerService } from '@nestjs-modules/mailer';
import { getMailerConfig } from '../../utils/extentions/mailer.extentions';
import { VerifyCode } from './models/verify-code.model';

@Injectable()
export class UserService extends IUserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(VerifyCode) private codeRepository: typeof VerifyCode,
    private mailerService: MailerService,
  ) {
    super();
  }

  async update(dto: UpdateUserDto, id: number): Promise<User> {
    const [updated] = await this.userRepository.update(
      {
        ...dto,
      },
      {
        where: {
          id: id,
        },
      },
    );
    if (updated != 1) {
      throw new BadRequestException({
        message: 'Такого юзера нет',
      });
    }
    return this.userRepository.findOne({
      where: {
        id: id,
      },
      include: [roleWithoutMany()],
    });
  }

  async getById(id: number, include: Includeable[] = []) {
    const candidate = await this.userRepository.findOne({
      where: {
        id: id,
      },
      include: include,
    });

    if (!candidate) {
      throw new BadRequestException({
        message: 'Такого пользователя не существует',
      });
    }

    return candidate;
  }

  private _getRoleInclude(roles?: number[]): Includeable {
    const role: WhereOptions<Role> = {};
    if (roles?.length) {
      role.id = {
        [Op.in]: roles,
      };
    }

    return {
      where: role,
      ...roleWithoutMany(),
    };
  }
  search(dto: FilterUserDto): Promise<User[]> {
    console.log(dto);
    return this.userRepository.findAll(
      rowed<User>(dto.row, {
        where: filteredFields<User>(['email', 'userName'], dto.q),
        include: [this._getRoleInclude(dto.roleIds)],
      }),
    );
  }

  async resend(id: number): Promise<SuccessOperationDto> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
      include: [VerifyCode],
    });
    if (!user.verifyCode) {
      throw new BadRequestException({
        message: 'Код уже введен',
      });
    }
    try {
      await this.mailerService.sendMail(
        getMailerConfig(user.email, user.verifyCode.code),
      );
    } catch (e) {
      throw new BadRequestException({
        message: 'Почты не существует',
      });
    }
    return { success: true };
  }

  async verify(dto: VerifyDto, id: number): Promise<SuccessOperationDto> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
      include: [VerifyCode],
    });
    if (!user.verifyCode) {
      throw new BadRequestException({
        message: 'Код уже введен',
      });
    }
    if (user.verifyCode.code != dto.code) {
      throw new BadRequestException({
        message: 'Код не совпадает',
      });
    }
    const verifyId = user.verifyId;

    await this.userRepository.update(
      {
        verifyId: null,
      },
      {
        where: {
          id: user.id,
        },
      },
    );
    await this.codeRepository.destroy({
      where: {
        id: verifyId,
      },
    });
    return { success: true };
  }
}
