import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegistrationDto } from './dto/registration-dto';
import { AuthorizeUserDto } from './dto/authorize-user.dto';
import { IAuthService } from '../../interfaces/i-auth.service';
import { TokensDto } from '../extra/jwt/tokens.dto';
import { RolesGuard } from '../../utils/gurads/user.guard';
import { GetPayload } from '../../utils/decorators/user.decorator';
import { AccessTokenDto } from '../extra/jwt/access-token.dto';
import { ErrorType } from '../../utils/error.type';

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
  async logout(@GetPayload() payload: AccessTokenDto) {
    return this.authService.logout(payload.id, payload.sessionName);
  }
}
