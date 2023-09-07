import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { RefreshTokenDto } from '../auth/dto/refresh-token.dto';
import { RolesGuard } from '../utils/gurads/user.guard';
import { GetUser } from '../utils/decorators/user.decorator';
import { User } from '../user/models/user.model';

@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Post('/refresh')
  async refreshToken(@Body() dto: RefreshTokenDto) {
    return this.sessionService.refreshToken(dto);
  }

  @UseGuards(RolesGuard)
  @Post('/remove')
  async remove(@Body() dto, @GetUser() user: User) {
    return this.sessionService.removeToken(dto, user);
  }
}
