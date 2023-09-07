import { ConfigModule } from '@nestjs/config';

export const globalConfig = [
  ConfigModule.forRoot({
    envFilePath: `.env.${process.env.NODE_ENV}`,
  }),
];
