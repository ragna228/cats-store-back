import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../utils/gurads/user.guard';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(RolesGuard)
  async test() {}
}
