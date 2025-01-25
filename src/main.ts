import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(express.static(join(__dirname, '..', 'public')));

  // app.use('*', (req, res) => {
  //   res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  // });

  app.enableCors({
    // origin: 'http://localhost:3000',
    origin: process.env.BASE_URL || 'https://turan-nedvijimost.kg',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT || 3001, '0.0.0.0');

  const url = await app.getUrl();
  console.log(`Server is running at: ${url}`);
}
bootstrap();
