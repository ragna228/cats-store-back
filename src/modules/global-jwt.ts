import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { globalConfig } from './global-config';

export const globalJwt = [
  JwtModule.registerAsync({
    imports: [...globalConfig],
    global: true,
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('PRIVATE_KEY'),
      signOptions: {
        expiresIn: '24h',
      },
    }),
    inject: [ConfigService],
  }),
];
