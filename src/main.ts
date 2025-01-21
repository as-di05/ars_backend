import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { join } from 'path';
// import * as express from 'express';

// async function bootstrap() {

//   // Перенаправление всех остальных маршрутов на index.html
//   app.use('*', (req, res) => {
//     res.sendFile(join(__dirname, '..', 'public', 'index.html'));
//   });

//   await app.listen(process.env.PORT || 3001, '0.0.0.0');
//   console.log(`Server is running on: ${await app.getUrl()}`);
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static(join(__dirname, '..', 'public')));

  app.use('*', (req, res) => {
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
