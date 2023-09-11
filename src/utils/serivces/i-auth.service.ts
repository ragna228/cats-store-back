import { TokensDto } from '../../auth/dto/tokens.dto';
import { RegistrationDto } from '../../auth/dto/registration-dto';
import { AuthorizeUserDto } from '../../auth/dto/authorize-user.dto';
import { SuccessOperationDto } from '../success-operation.dto';

export abstract class IAuthService {
  abstract registration(dto: RegistrationDto): Promise<TokensDto>;
  abstract authorize(dto: AuthorizeUserDto): Promise<TokensDto>;
  abstract logout(
    userId: number,
    sessionName: string,
  ): Promise<SuccessOperationDto>;
}
