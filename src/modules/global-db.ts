import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';

export const globalDb = [
  SequelizeModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        dialect: 'postgres',
        host: configService.get('DATABASE_HOST'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE'),
        models: [],
        autoLoadModels: true,
      };
    },
  }),
];
