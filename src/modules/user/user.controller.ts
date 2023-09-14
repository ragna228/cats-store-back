import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserCreationAttributes } from './models/user.model';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from '../../interfaces/i-user.service';
import { ErrorType } from '../../utils/error.type';
import { RolesGuard } from '../../utils/gurads/user.guard';
import { GetPayload } from '../../utils/decorators/user.decorator';
import { AccessTokenDto } from '../extra/jwt/access-token.dto';
import {
  Roles,
  SkipEmailVerification,
} from '../../utils/decorators/auth.decorator';
import { SuccessOperationDto } from '../../utils/success-operation.dto';
import { VerifyDto } from './dto/verify-dto';

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
  async my(@GetPayload() { id }: AccessTokenDto) {
    return this.userService.getById(id);
  }

  @ApiOperation({ summary: 'Поиск пользователей' })
  @ApiResponse({ status: 201, type: [UserCreationAttributes] })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post('/')
  async search(@Body() dto: FilterUserDto) {
    return this.userService.search(dto);
  }

  @ApiOperation({ summary: 'Изменение информации о пользователе' })
  @ApiResponse({ status: 201, type: [UserCreationAttributes] })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Put('/edit')
  async edit(
    @Body() dto: UpdateUserDto,
    @GetPayload() payload: AccessTokenDto,
  ) {
    return this.userService.update(dto, payload.id);
  }

  @ApiOperation({ summary: 'Пользователь по id' })
  @ApiResponse({ status: 201, type: UserCreationAttributes })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get('/:id')
  async getById(@Param('id') id: number) {
    return this.userService.getById(id);
  }

  @ApiOperation({ summary: 'Повторная отправка' })
  @ApiResponse({ status: 201, type: SuccessOperationDto })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @SkipEmailVerification()
  @Post('/resend')
  async resend(@GetPayload() payload: AccessTokenDto) {
    return this.userService.resend(payload.id);
  }

  @ApiOperation({ summary: 'Подтверждение кода' })
  @ApiResponse({ status: 201, type: SuccessOperationDto })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @SkipEmailVerification()
  @Post('/verify')
  async verify(@Body() dto: VerifyDto, @GetPayload() payload: AccessTokenDto) {
    return this.userService.verify(dto, payload.id);
  }
}
