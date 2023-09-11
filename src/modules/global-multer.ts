import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { globalConfig } from './global-config';
import { diskStorage } from 'multer';

export const globalMulter = [
  MulterModule.registerAsync({
    imports: [...globalConfig],
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

            const castedRequest = req as { body: {} };

            const result: string | string[] | undefined =
              castedRequest.body[file.fieldname];

            if (!result) {
              castedRequest.body[file.fieldname] = fileName;
            } else {
              if (Array.isArray(result)) {
                result.push(fileName);
              } else {
                castedRequest.body[file.fieldname] = [result, fileName];
              }
            }

            callback(null, fileName);
          },
        }),
      };
    },
  }),
];
