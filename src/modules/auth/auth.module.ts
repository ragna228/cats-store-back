import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IAuthService } from '../../interfaces/i-auth.service';
import { SessionManagerModule } from '../extra/session/session-manager.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { SequelizeModule } from '@nestjs/sequelize';
import { VerifyCode } from '../user/models/verify-code.model';

@Module({
  imports: [
    SessionManagerModule,
    MailerModule,
    SequelizeModule.forFeature([VerifyCode]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: IAuthService,
      useClass: AuthService,
    },
  ],
  exports: [IAuthService],
})
export class AuthModule {}
