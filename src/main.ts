import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.APP_PORT || 5555;
  const DOCS_URL = process.env.DOCS_URL || '/api/docs';
  const APP_URL = `http://localhost:${PORT}`;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Апи для магазина котиков')
    .setDescription('Документация REST API')
    .addBearerAuth({ in: 'header', type: 'http' })
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(DOCS_URL, app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ credentials: true, origin: true });

  await app.listen(PORT, () => {
    console.log(`App started on url: ${APP_URL}`);
    console.log(`docs on ${APP_URL}${DOCS_URL}`);
  });
}
bootstrap();
