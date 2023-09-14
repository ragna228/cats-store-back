import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { allModels, globalModels } from '../modules/info';

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
        models: [...allModels],
        //sync: { force: true },
        autoLoadModels: true,
      };
    },
  }),
  SequelizeModule.forFeature([...globalModels]),
];
