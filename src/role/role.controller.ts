import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
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
import { IRoleService } from '../utils/serivces/i-role.service';
import { SuccessOperationDto } from '../utils/success-operation.dto';
import { ChangeRoleUserState } from './dto/change-role-user.state';

@ApiTags('Роли')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private roleService: IRoleService) {}

  @ApiOperation({ summary: 'Список ролей' })
  @ApiResponse({ status: 200, type: [RoleCreationAttributes] })
  @ApiResponse({ status: 400, type: ErrorType })
  @Get('/')
  async all() {
    return this.roleService.getAll();
  }

  @ApiOperation({ summary: 'Получить роль по имени' })
  @ApiResponse({ status: 200, type: RoleCreationAttributes })
  @ApiResponse({ status: 400, type: ErrorType })
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

  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Выдать роль юзеру' })
  @ApiResponse({ status: 201, type: SuccessOperationDto })
  @ApiResponse({ status: 400, type: ErrorType })
  @Roles('ADMIN')
  @Put('/addRoleToUser')
  async addRoleToUser(@Body() dto: ChangeRoleUserState) {
    return this.roleService.addRoleToUser(dto);
  }

  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Удалить роль у уюзера' })
  @ApiResponse({ status: 201, type: SuccessOperationDto })
  @ApiResponse({ status: 400, type: ErrorType })
  @Roles('ADMIN')
  @Put('/removeRoleFromUser')
  async removeRoleFromUser(@Body() dto: ChangeRoleUserState) {
    return this.roleService.removeRoleFromUser(dto);
  }
}
