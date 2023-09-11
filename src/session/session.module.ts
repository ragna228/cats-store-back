import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { UserModule } from '../user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Session } from './models/session.model';
import { ISessionService } from '../utils/serivces/i-session.service';

@Module({
  imports: [UserModule, SequelizeModule.forFeature([Session])],
  providers: [
    {
      provide: ISessionService,
      useClass: SessionService,
    },
  ],
  controllers: [SessionController],
  exports: [ISessionService],
})
export class SessionModule {}
