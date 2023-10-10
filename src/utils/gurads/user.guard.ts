import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { REQUIRE_AUTH } from '../decorators/auth.decorator';
import { User } from '../../modules/user/models/user.model';
import { JwtService } from '../../modules/extra/jwt/jwt.service';
import { AccessTokenDto } from '../../modules/extra/jwt/access-token.dto';

interface GuardConfiguration {
  notRequireAuth: boolean;
}
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  loadConfig(context: ExecutionContext): GuardConfiguration {
    return {
      notRequireAuth:
        this.reflector.get<boolean>(REQUIRE_AUTH, context.getHandler()) ??
        false,
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { notRequireAuth } = this.loadConfig(context);

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      if (notRequireAuth) return true;
      throw new ForbiddenException({ message: 'Токена нет в заголовке' });
    }
    const [bearer, token] = authHeader.split(' ');

    if (bearer.toLowerCase() !== 'bearer' || !token)
      throw new UnauthorizedException({
        message: 'Формат токена не совпадает',
      });

    const decoded: AccessTokenDto = this.jwtService.decode<AccessTokenDto>(
      token,
      'access',
    );

    if (!decoded)
      throw new UnauthorizedException({
        message: 'Формат токена не совпадает',
      });

    req.payload = decoded;

    const { id } = decoded;

    const user: User = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new UnauthorizedException({
        message: 'Аккаунта не существует',
      });
    }
    req.user = user;

    return true;
  }
}
