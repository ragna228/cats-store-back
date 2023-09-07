import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [SessionService],
  controllers: [SessionController],
})
export class SessionModule {}
