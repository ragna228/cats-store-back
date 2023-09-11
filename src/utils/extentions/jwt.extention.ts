import { JwtService } from '@nestjs/jwt';

export const tryVerify = <T extends object>(
  token: string,
  jwtService: JwtService,
): T | null => {
  try {
    return jwtService.verify<T>(token);
  } catch (e) {
    return null;
  }
};
