import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // === 1. STATIC FILES ===
  app.use(express.static(join(__dirname, '..', 'public')));

  // === 2. WWW REDIRECT ===
  app.use((req, res, next) => {
    if (req.hostname === 'www.turan-nedvijimost.kg') {
      return res.redirect(301, `https://turan-nedvijimost.kg${req.url}`);
    }
    next();
  });

  // === 3. CORS ===
  app.enableCors({
    origin: 'https://turan-nedvijimost.kg',
    credentials: true,
  });

  // === 4. GLOBAL SETTINGS ===
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new UnauthorizedInterceptor());

  // === 5. CATCH-ALL HANDLER FOR SPA (React/Vite/Next export) ===
  app.use('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  });

  // === 6. START SERVER ===
  await app.listen(process.env.PORT || 3001, '0.0.0.0');

  console.log(`Server is running at: ${await app.getUrl()}`);
}

bootstrap();
