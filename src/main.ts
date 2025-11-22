import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS настройка - разрешаем запросы с фронтенда
  const allowedOrigins = [
    process.env.BASE_URL || 'https://turan-nedvijimost.kg',
    'http://localhost:3000', // для разработки
    'http://localhost:3001', // для разработки
  ].filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Разрешаем запросы без origin (например, Postman, мобильные приложения)
      if (!origin) {
        return callback(null, true);
      }
      // Разрешаем запросы с разрешенных источников
      if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
        return callback(null, true);
      }
      // В режиме разработки разрешаем все
      if (process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      callback(null, true); // Разрешаем все для упрощения
    },
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new UnauthorizedInterceptor());

  // Устанавливаем правильные заголовки для JSON ответов с UTF-8
  app.use((req, res, next) => {
    // Для API маршрутов устанавливаем правильный Content-Type с charset
    if (
      req.path.startsWith('/api') ||
      req.path.startsWith('/auth') ||
      req.path.startsWith('/users') ||
      req.path.startsWith('/categories') ||
      req.path.startsWith('/real-estate') ||
      req.path.startsWith('/real_estate') ||
      req.path.startsWith('/customers') ||
      req.path.startsWith('/uploads')
    ) {
      // Устанавливаем charset для JSON ответов
      res.charset = 'utf-8';
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
    }
    next();
  });

  // Catch-all handler для SPA - должен быть последним
  // Отдаем index.html для всех маршрутов, которые не являются API или статическими файлами
  app.use((req, res, next) => {
    // Пропускаем API маршруты (проверяем оба варианта: с дефисом и подчеркиванием)
    if (
      req.path.startsWith('/api') ||
      req.path.startsWith('/auth') ||
      req.path.startsWith('/users') ||
      req.path.startsWith('/categories') ||
      req.path.startsWith('/real-estate') || // с дефисом (как в контроллере)
      req.path.startsWith('/real_estate') || // с подчеркиванием (на всякий случай)
      req.path.startsWith('/customers') ||
      req.path.startsWith('/uploads')
    ) {
      return next();
    }
    
    // Пропускаем статические файлы (ServeStaticModule обработает их)
    // Если это файл с расширением, пропускаем
    if (req.path.includes('.') && !req.path.endsWith('/')) {
      return next();
    }
    
    // Для всех остальных маршрутов отдаем index.html (SPA routing)
    res.sendFile(join(__dirname, '..', 'public', 'index.html'), (err) => {
      if (err) {
        next(err);
      }
    });
  });

  await app.listen(process.env.PORT || 3001, '0.0.0.0');

  const url = await app.getUrl();
  console.log(`Server is running at: ${url}`);
}
bootstrap();
