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

@Injectable()
export class UserService extends IUserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {
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
}
