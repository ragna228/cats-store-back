import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';
import { RefreshTokenDto } from './refresh-token.dto';
import { AccessTokenDto } from './access-token.dto';

export interface JwtConfig {
  secretKey: string;
  expiresIn: string;
}
export type JwtConfigType = 'access' | 'refresh';
@Injectable()
export class JwtService {
  private static readonly SECRET_KEY = 'PRIVATE_KEY';
  private static readonly EXPIRES_IN_KEY = 'EXPIRES_IN';
  public static readonly CONFIG_TYPES: JwtConfigType[] = ['access', 'refresh'];

  private configs: Map<JwtConfigType, JwtConfig>;

  constructor(private configService: ConfigService) {
    this.configs = new Map<JwtConfigType, JwtConfig>();
    for (const configType of JwtService.CONFIG_TYPES) {
      console.log(configType);
      this.configs.set(configType, {
        secretKey: configService.get<string>(
          `${configType.toUpperCase()}_${JwtService.SECRET_KEY}`,
        ),
        expiresIn: configService.get<string>(
          `${configType.toUpperCase()}_${JwtService.EXPIRES_IN_KEY}`,
        ),
      });
    }
  }

  generate(
    payload: AccessTokenDto | RefreshTokenDto,
    key: JwtConfigType,
  ): string {
    const config = this.configs.get(key);
    return sign(payload, config.secretKey, { expiresIn: config.expiresIn });
  }

  decode<T>(token: string, key: JwtConfigType): T | null {
    try {
      return verify(token, this.configs.get(key).secretKey) as T;
    } catch (e: any) {
      return null;
    }
  }
}
