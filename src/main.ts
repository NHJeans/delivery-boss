// src/main.ts

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  app.use(cookieParser());
  app.useStaticAssets(join(process.cwd(), './src', 'public'));
  app.setBaseViewsDir(join(process.cwd(), './src', 'view'));
  console.log(__dirname)
  console.log(process.cwd())
  app.setViewEngine('hbs');

  app.use(cookieParser());
  const config = new DocumentBuilder().setTitle('Delivery Boss').setDescription('The Median API description').setVersion('0.1').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
