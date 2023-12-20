import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CatModule } from './cat/cat.module';
import { OrderModule } from './order/order.module';
import { RoleModule } from './role/role.module';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';
import { User } from './user/models/user.model';
import { Cart } from './cart/models/cart.model';
import { Cat } from './cat/models/cat.model';
import { Order } from './order/models/order.model';
import { Role } from './role/models/role.model';
import { Session } from './session/models/session.model';
import { OrderCat } from './order/models/order-cat.model';
import { VerifyCode } from './user/models/verify-code.model';
import { CartCat } from './cart/models/cart-cat.model';
import { UserRole } from './role/models/user.role.model';
import { JwtModule } from './extra/jwt/jwt.module';

export const extraModules = [JwtModule];

export const allModules = [
  AuthModule,
  CartModule,
  CatModule,
  OrderModule,
  RoleModule,
  SessionModule,
  UserModule,
];

export const allModels = [
  User,
  Cart,
  Cat,
  Order,
  Role,
  Session,
  VerifyCode,
  OrderCat,
  CartCat,
  UserRole,
];

export const globalModels = [User, UserRole, Role, Session];
