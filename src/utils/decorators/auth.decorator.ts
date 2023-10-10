import { SetMetadata } from '@nestjs/common';

export const REQUIRE_AUTH = 'nonRequireAuth';

export const NotRequireAuth = () => SetMetadata(REQUIRE_AUTH, true);
