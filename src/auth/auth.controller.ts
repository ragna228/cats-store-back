import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration-dto';
import { AuthorizeUserDto } from './dto/authorize-user.dto';
import { RolesGuard } from '../utils/gurads/user.guard';
import { GetUser } from '../utils/decorators/user.decorator';
import { User } from '../user/models/user.model';
import { SessionDto } from '../session/dto/session.dto';
import { TokensDto } from './dto/tokens.dto';
import { ErrorType } from '../utils/errors/error.type';

@ApiBearerAuth()
@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201, type: TokensDto })
  @ApiResponse({ status: 400, type: ErrorType })
  @Post('/register')
  async registration(@Body() dto: RegistrationDto) {
    return this.authService.registration(dto);
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 201, type: TokensDto })
  @ApiResponse({ status: 400, type: ErrorType })
  @Post('/login')
  async login(@Body() dto: AuthorizeUserDto) {
    return this.authService.authorize(dto);
  }

  @ApiOperation({ summary: 'Выход пользователя' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Post('/logout')
  async logout(@Body() dto: SessionDto, @GetUser() user: User) {
    return this.authService.logout(dto, user);
  }
}
