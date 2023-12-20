import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const SKIP_EMAIL = 'skip';
export const REQUIRE_AUTH = 'nonRequireAuth';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
export const SkipEmailVerification = () => SetMetadata(SKIP_EMAIL, true);
export const NotRequireAuth = () => SetMetadata(REQUIRE_AUTH, true);
