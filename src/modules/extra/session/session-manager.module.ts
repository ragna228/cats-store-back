import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Session } from '../../session/models/session.model';
import { SessionManagerService } from './session-manager.service';

@Module({
  imports: [SequelizeModule.forFeature([Session])],
  providers: [SessionManagerService],
  exports: [SessionManagerService],
})
export class SessionManagerModule {}
