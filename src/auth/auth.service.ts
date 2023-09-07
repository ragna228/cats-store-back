import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegistrationDto } from './dto/registration-dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async registration(dto: RegistrationDto) {}
}
