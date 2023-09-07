import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { RolesGuard } from '../utils/gurads/user.guard';
import { Roles } from '../utils/decorators/auth.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorType } from '../utils/errors/error.type';
import { RoleCreationAttributes } from './models/role.model';

@ApiTags('Роли')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @ApiOperation({ summary: 'Список ролей' })
  @ApiResponse({ status: 201, type: [RoleCreationAttributes] })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Get('/')
  async all() {
    return this.roleService.getAll();
  }

  @ApiOperation({ summary: 'Получить роль по имени' })
  @ApiResponse({ status: 201, type: RoleCreationAttributes })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Get('/:name')
  async getByName(@Param('name') name: string) {
    return this.roleService.getOrError(name);
  }

  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Создать роль' })
  @ApiResponse({ status: 201, type: RoleCreationAttributes })
  @ApiResponse({ status: 400, type: ErrorType })
  @Roles('ADMIN')
  @Post('/create')
  async create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }
}
