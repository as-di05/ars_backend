import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(express.static(join(__dirname, '..', 'public')));

  app.use('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return next(); // Пропускаем API-запросы
    }
    // Для всех остальных запросов возвращаем index.html
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  });

  app.enableCors({
    // origin: 'http://localhost:3000',
    origin:
      process.env.BASE_URL ||
      'https://turan-nedvijimost-27595b75bbe9.herokuapp.com',
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
