import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration-dto';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  async registration(dto: RegistrationDto) {
    return this.authService.registration(dto);
  }
}
