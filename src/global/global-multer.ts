import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';

export const globalMulter = [
  MulterModule.registerAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        storage: diskStorage({
          destination: configService.get('IMAGE_PATH'),
          filename(
            req: Express.Request,
            file: Express.Multer.File,
            callback: (error: Error | null, filename: string) => void,
          ) {
            const fileName = `${Math.random()}-${Date.now()}.${file.originalname
              .split('.')
              .at(-1)}`;
            file.filename = fileName;

            callback(null, fileName);
          },
        }),
      };
    },
  }),
];
