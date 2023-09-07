import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration-dto';
import { AuthorizeUserDto } from './dto/authorize-user.dto';
import { RolesGuard } from '../utils/gurads/user.guard';
import { GetUser } from '../utils/decorators/user.decorator';
import { User } from '../user/models/user.model';
import { SessionDto } from '../session/dto/session.dto';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registration(@Body() dto: RegistrationDto) {
    return this.authService.registration(dto);
  }

  @Post('/login')
  async login(@Body() dto: AuthorizeUserDto) {
    return this.authService.authorize(dto);
  }
  @UseGuards(RolesGuard)
  @Post('/logout')
  async logout(@Body() dto: SessionDto, @GetUser() user: User) {
    return this.authService.logout(dto, user);
  }
}
