import { RoleCreationAttributes } from '../models/role.model';
import { OmitType } from '@nestjs/swagger';

export class CreateRoleDto extends OmitType(RoleCreationAttributes, ['id']) {}
