import { FilterUserDto } from '../modules/user/dto/filter-user.dto';
import { User } from '../modules/user/models/user.model';
import { UpdateUserDto } from '../modules/user/dto/update-user.dto';
import { SuccessOperationDto } from '../utils/success-operation.dto';
import { VerifyDto } from '../modules/user/dto/verify-dto';

export abstract class IUserService {
  abstract search(dto: FilterUserDto): Promise<User[]>;
  abstract getById(id: number): Promise<User>;
  abstract update(dto: UpdateUserDto, id: number): Promise<User>;
  abstract resend(id: number): Promise<SuccessOperationDto>;
  abstract verify(dto: VerifyDto, id: number): Promise<SuccessOperationDto>;
}
