import { RoleCreationAttributes } from '../models/role.model';

export type CreateRoleDto = Omit<RoleCreationAttributes, 'id'>;
