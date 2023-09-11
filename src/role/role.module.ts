import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { IRoleService } from '../utils/serivces/i-role.service';
import { UserRole } from './models/user.role.model';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, SequelizeModule.forFeature([Role, UserRole])],
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
