import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Session } from './models/session.model';
import { ISessionService } from '../../interfaces/i-session.service';
import { SessionManagerModule } from '../extra/session/session-manager.module';

@Module({
  imports: [SessionManagerModule, SequelizeModule.forFeature([Session])],
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
