import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RoleService,
  ) {}

  async create(dto: CreateUserDto) {
    const candidate = this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });
    if (candidate) {
      throw new BadRequestException({
        message: 'Пользователь с такой почтой уже существует',
      });
    }

    const role = await this.roleService.getOrCreate('USER');

    const user = await this.userRepository.create({
      ...dto,
    });
    await user.$set('roles', role.id);
    user.roles.push(role);

    return user;
  }
}
