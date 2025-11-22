import { Controller } from '@nestjs/common';

@Controller()
export class AppController {
  // Контроллер оставлен пустым
  // Фронтенд обслуживается через ServeStaticModule и catch-all middleware в main.ts
  // Все API маршруты находятся в других модулях (auth, users, categories, etc.)
}
