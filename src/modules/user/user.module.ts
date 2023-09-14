import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { IUserService } from '../../interfaces/i-user.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { SequelizeModule } from '@nestjs/sequelize';
import { VerifyCode } from './models/verify-code.model';

@Module({
  imports: [MailerModule, SequelizeModule.forFeature([VerifyCode])],
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
