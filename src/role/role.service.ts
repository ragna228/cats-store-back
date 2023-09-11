import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { IRoleService } from '../utils/serivces/i-role.service';
import { ChangeRoleUserState } from './dto/change-role-user.state';
import { SuccessOperationDto } from '../utils/success-operation.dto';
import { UserRole } from './models/user.role.model';
import { IUserService } from '../utils/serivces/i-user.service';

@Injectable()
export class RoleService extends IRoleService {
  constructor(
    @InjectModel(Role) private roleRepository: typeof Role,
    @InjectModel(UserRole) private userRoleRepository: typeof UserRole,
    private userService: IUserService,
  ) {
    super();
  }
  //20 неделя 50 месяц
  async getAll() {
    return this.roleRepository.findAll();
  }
  async get(name: string) {
    return this.roleRepository.findOne({
      where: {
        name: name,
      },
    });
  }
  async create(dto: CreateRoleDto) {
    return this.roleRepository.create({
      ...dto,
    });
  }
  async getOrCreate(name: string) {
    const candidate = await this.get(name);
    if (candidate) return candidate;
    return this.create({
      name: name,
    });
  }
  async getOrError(name: string) {
    const candidate = await this.get(name);

    if (!candidate) {
      throw new BadRequestException({
        message: 'Такой роли нет',
      });
    }

    return candidate;
  }
  async addRoleToUser(dto: ChangeRoleUserState): Promise<SuccessOperationDto> {
    const candidate = await this.userService.getById(dto.userId, [Role]);

    if (candidate.roles.find((e) => e.name == dto.roleName)) {
      throw new BadRequestException({
        message: 'Такая роль у пользователя уже есть',
      });
    }

    const role = await this.getOrError(dto.roleName);

    await candidate.$add('roles', role.id);

    return { success: true };
  }
  async removeRoleFromUser(
    dto: ChangeRoleUserState,
  ): Promise<SuccessOperationDto> {
    const candidate = await this.userService.getById(dto.userId, [Role]);

    if (!candidate.roles.find((e) => e.name == dto.roleName)) {
      throw new BadRequestException({
        message: 'Такой роли у пользователя нет',
      });
    }

    const role = await this.getOrError(dto.roleName);

    await candidate.$remove('roles', role.id);

    return { success: true };
  }
}
