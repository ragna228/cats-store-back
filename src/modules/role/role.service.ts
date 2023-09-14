import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { ChangeRoleUserState } from './dto/change-role-user.state';
import { UserRole } from './models/user.role.model';
import { IRoleService } from '../../interfaces/i-role.service';
import { SuccessOperationDto } from '../../utils/success-operation.dto';
import { User } from '../user/models/user.model';

@Injectable()
export class RoleService extends IRoleService {
  constructor(
    @InjectModel(Role) private roleRepository: typeof Role,
    @InjectModel(UserRole) private userRoleRepository: typeof UserRole,
    @InjectModel(User) private userRepository: typeof User,
  ) {
    super();
  }
  //20 неделя 50 месяц
  async getAll() {
    return this.roleRepository.findAll();
  }
  async get(name: string) {
    const candidate = await this.roleRepository.findOne({
      where: {
        name: name,
      },
    });

    if (!candidate) {
      throw new BadRequestException({
        message: 'Такой роли нет',
      });
    }

    return candidate;
  }
  async create(dto: CreateRoleDto) {
    return this.roleRepository.create({
      ...dto,
    });
  }
  async addRoleToUser(dto: ChangeRoleUserState): Promise<SuccessOperationDto> {
    const candidate = await this.userRepository.findOne({
      where: {
        id: dto.userId,
      },
      include: [Role],
    });

    if (candidate.roles.find((e) => e.name == dto.roleName)) {
      throw new BadRequestException({
        message: 'Такая роль у пользователя уже есть',
      });
    }

    const role = await this.get(dto.roleName);

    await candidate.$add('roles', role.id);

    return { success: true };
  }
  async removeRoleFromUser(
    dto: ChangeRoleUserState,
  ): Promise<SuccessOperationDto> {
    const candidate = await this.userRepository.findOne({
      where: {
        id: dto.userId,
      },
      include: [Role],
    });

    if (!candidate.roles.find((e) => e.name == dto.roleName)) {
      throw new BadRequestException({
        message: 'Такой роли у пользователя нет',
      });
    }

    const role = await this.get(dto.roleName);

    await candidate.$remove('roles', role.id);

    return { success: true };
  }
}
