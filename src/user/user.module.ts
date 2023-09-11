import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { IUserService } from '../utils/serivces/i-user.service';

@Module({
  providers: [
    {
      provide: IUserService,
      useClass: UserService,
    },
  ],
  controllers: [UserController],
  exports: [IUserService],
})
export class UserModule {}
