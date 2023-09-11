import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { SessionModule } from '../session/session.module';
import { IAuthService } from '../utils/serivces/i-auth.service';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [RoleModule, UserModule, SessionModule],
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
