import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { UserRole } from './models/user.role.model';
import { IRoleService } from '../../interfaces/i-role.service';

@Module({
  imports: [SequelizeModule.forFeature([Role, UserRole])],
  controllers: [RoleController],
  providers: [
    {
      provide: IRoleService,
      useClass: RoleService,
    },
  ],
  exports: [IRoleService],
})
export class RoleModule {}
