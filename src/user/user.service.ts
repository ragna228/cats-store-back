import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { IUserService } from '../utils/serivces/i-user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Includeable, Op, WhereOptions } from 'sequelize';
import { FilterUserDto } from './dto/filter-user.dto';
import { filteredFields, rowed } from '../utils/extentions/shared.extentions';
import { Role } from '../role/models/role.model';
import { roleWithoutMany } from '../utils/extentions/role.extentions';

@Injectable()
export class UserService extends IUserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {
    super();
  }

  async create(dto: CreateUserDto) {
    const candidate = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });
    if (candidate) {
      throw new BadRequestException({
        message: 'Пользователь с такой почтой уже существует',
      });
    }

    const user = await this.userRepository.create({
      ...dto,
    });
    await user.$set(
      'roles',
      dto.roles.map((e) => e.id),
    );
    user.roles = dto.roles;

    return user;
  }
  async getByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
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
    return this.userRepository.findAll(
      rowed<User>(dto.row, {
        where: filteredFields<User>(['email', 'userName'], dto.q),
        include: [this._getRoleInclude(dto.roleIds)],
      }),
    );
  }
}
