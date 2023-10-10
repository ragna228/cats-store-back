import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegistrationDto } from './dto/registration-dto';
import { AuthorizeUserDto } from './dto/authorize-user.dto';
import { TokensDto } from '../extra/jwt/tokens.dto';
import { ErrorType } from '../../utils/error.type';
import { AuthService } from './auth.service';

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
}
