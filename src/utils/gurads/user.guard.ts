import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole } from '../../role/models/user.role.model';
import {
  REQUIRE_AUTH,
  ROLES_KEY,
  SKIP_EMAIL,
} from '../decorators/auth.decorator';
import { Role } from '../../role/models/role.model';
import { User } from '../../user/models/user.model';

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

    const id: number = this.jwtService.decode(token)['id'];

    console.log(id);

    if (id == undefined)
      throw new UnauthorizedException({
        message: 'Формат токена не совпадает',
      });

    const user: User = await this.userRepository.findOne({
      where: { id: id },
      include: [Role],
    });

    if (!user) {
      throw new UnauthorizedException({
        message: 'Аккаунта не существует',
      });
    }

    if (!isSkipEmail && !user.verifyId) {
      throw new UnauthorizedException({
        message: 'Аккаунт не подтвержден',
      });
    }

    if (!user.roles.some((role) => requiredRoles.includes(role.name))) {
      throw new UnauthorizedException({
        message: 'У вас нет нужных ролей',
      });
    }
    req.user = user;
    return true;
  }
}
