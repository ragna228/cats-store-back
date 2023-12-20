import { RegistrationDto } from '../modules/auth/dto/registration-dto';
import { TokensDto } from '../modules/extra/jwt/tokens.dto';
import { AuthorizeUserDto } from '../modules/auth/dto/authorize-user.dto';
import { SuccessOperationDto } from '../utils/success-operation.dto';

export abstract class IAuthService {
  abstract registration(dto: RegistrationDto): Promise<TokensDto>;
  abstract authorize(dto: AuthorizeUserDto): Promise<TokensDto>;
  abstract logout(
    userId: number,
    sessionName: string,
  ): Promise<SuccessOperationDto>;
}
