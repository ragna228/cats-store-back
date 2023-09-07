import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async getOrCreate(name: string) {
    const candidate = await this.get(name);
    if (candidate) return candidate;
    return this.create({
      name: name,
    });
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
}
