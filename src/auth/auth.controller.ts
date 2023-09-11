import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegistrationDto } from './dto/registration-dto';
import { AuthorizeUserDto } from './dto/authorize-user.dto';
import { RolesGuard } from '../utils/gurads/user.guard';
import { GetPayload } from '../utils/decorators/user.decorator';
import { TokensDto } from './dto/tokens.dto';
import { ErrorType } from '../utils/errors/error.type';
import { IAuthService } from '../utils/serivces/i-auth.service';
import { InfoTokenDto } from '../utils/info-token.dto';

@ApiBearerAuth()
@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: IAuthService) {}

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
  async logout(@GetPayload() payload: InfoTokenDto) {
    return this.authService.logout(payload.id, payload.sessionName);
  }
}
