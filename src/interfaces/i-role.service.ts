import { Role } from '../modules/role/models/role.model';
import { CreateRoleDto } from '../modules/role/dto/create-role.dto';
import { ChangeRoleUserState } from '../modules/role/dto/change-role-user.state';
import { SuccessOperationDto } from '../utils/success-operation.dto';

export abstract class IRoleService {
  abstract getAll(): Promise<Role[]>;
  abstract create(dto: CreateRoleDto): Promise<Role>;
  abstract get(name: string): Promise<Role>;
  abstract addRoleToUser(
    dto: ChangeRoleUserState,
  ): Promise<SuccessOperationDto>;
  abstract removeRoleFromUser(
    dto: ChangeRoleUserState,
  ): Promise<SuccessOperationDto>;
}
