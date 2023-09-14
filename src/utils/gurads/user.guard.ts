import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import {
  REQUIRE_AUTH,
  ROLES_KEY,
  SKIP_EMAIL,
} from '../decorators/auth.decorator';
import { UserRole } from '../../modules/role/models/user.role.model';
import { User } from '../../modules/user/models/user.model';
import { Role } from '../../modules/role/models/role.model';
import { Session } from '../../modules/session/models/session.model';
import { JwtService } from '../../modules/extra/jwt/jwt.service';
import { AccessTokenDto } from '../../modules/extra/jwt/access-token.dto';

interface GuardConfiguration {
  requiredRoles: string[];
  isSkipEmail: boolean;
  notRequireAuth: boolean;
}
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    @InjectModel(UserRole) private userRoleRepository: typeof UserRole,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  loadConfig(context: ExecutionContext): GuardConfiguration {
    return {
      requiredRoles:
        this.reflector.get<string[]>(ROLES_KEY, context.getHandler()) ?? [],
      isSkipEmail:
        this.reflector.get<boolean>(SKIP_EMAIL, context.getHandler()) ?? false,
      notRequireAuth:
        this.reflector.get<boolean>(REQUIRE_AUTH, context.getHandler()) ??
        false,
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { requiredRoles, isSkipEmail, notRequireAuth } =
      this.loadConfig(context);

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

    const { sessionId, id } = decoded;

    const user: User = await this.userRepository.findOne({
      where: { id: id },
      include: [Role, Session],
    });

    if (!user) {
      throw new UnauthorizedException({
        message: 'Аккаунта не существует',
      });
    }

    if (!user.sessions.find((e) => e.id == sessionId)) {
      throw new BadRequestException({
        message: 'Сессия уже завершена',
      });
    }

    if (!isSkipEmail && user.verifyId) {
      throw new UnauthorizedException({
        message: 'Аккаунт не подтвержден',
      });
    }

    req.user = user;

    if (
      requiredRoles.length != 0 &&
      !user.roles.some((role) => requiredRoles.includes(role.name))
    ) {
      throw new UnauthorizedException({
        message: 'У вас нет нужных ролей',
      });
    }

    return true;
  }
}
