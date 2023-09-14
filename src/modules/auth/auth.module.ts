import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IAuthService } from '../../interfaces/i-auth.service';
import { SessionManagerModule } from '../extra/session/session-manager.module';

@Module({
  imports: [SessionManagerModule],
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
