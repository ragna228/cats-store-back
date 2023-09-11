import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IUserService } from '../utils/serivces/i-user.service';
import { ErrorType } from '../utils/errors/error.type';
import { UserCreationAttributes } from './models/user.model';
import { FilterUserDto } from './dto/filter-user.dto';
import { RolesGuard } from '../utils/gurads/user.guard';
import { Roles } from '../utils/decorators/auth.decorator';
import { GetPayload } from '../utils/decorators/user.decorator';
import { InfoTokenDto } from '../utils/info-token.dto';
import { roleWithoutMany } from '../utils/extentions/role.extentions';

@ApiTags('Пользователи')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: IUserService) {}

  @ApiOperation({ summary: 'Информация о себе' })
  @ApiResponse({ status: 201, type: UserCreationAttributes })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Get('/my')
  async my(@GetPayload() { id }: InfoTokenDto) {
    console.log(id);
    return this.userService.getById(id, [roleWithoutMany()]);
  }

  @ApiOperation({ summary: 'Поиск пользователей' })
  @ApiResponse({ status: 201, type: [UserCreationAttributes] })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post('/')
  async create(@Body() dto: FilterUserDto) {
    return this.userService.search(dto);
  }

  @ApiOperation({ summary: 'Пользователь по id' })
  @ApiResponse({ status: 201, type: UserCreationAttributes })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get('/:id')
  async getById(@Param('id') id: number) {
    return this.userService.getById(id, [roleWithoutMany()]);
  }
}
