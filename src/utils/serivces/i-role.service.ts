import { CreateRoleDto } from '../../role/dto/create-role.dto';
import { Role } from '../../role/models/role.model';
import { ChangeRoleUserState } from '../../role/dto/change-role-user.state';
import { SuccessOperationDto } from '../success-operation.dto';

export abstract class IRoleService {
  abstract getAll(): Promise<Role[]>;
  abstract get(name: string): Promise<Role>;
  abstract create(dto: CreateRoleDto): Promise<Role>;
  abstract getOrCreate(name: string): Promise<Role>;
  abstract getOrError(name: string): Promise<Role>;
  abstract addRoleToUser(
    dto: ChangeRoleUserState,
  ): Promise<SuccessOperationDto>;
  abstract removeRoleFromUser(
    dto: ChangeRoleUserState,
  ): Promise<SuccessOperationDto>;
}
