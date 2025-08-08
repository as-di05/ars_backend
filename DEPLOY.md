# Деплой ARS CRM Backend

## Быстрый деплой на сервер

### 1. Скопируйте проект на сервер

```bash
# Клонируйте или загрузите проект на сервер
git clone <your-repo-url>
cd ars_backend
```

### 2. Настройте переменные окружения

```bash
# Скопируйте файл примера
cp env.production .env

# Отредактируйте .env файл
nano .env
```

Обновите следующие параметры:
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` - данные вашей базы данных
- `JWT_SECRET` - сгенерируйте сильный секретный ключ
- `AWS_*` - настройки AWS S3 (если используете)

### 3. Установите зависимости и соберите проект

```bash
# Установка зависимостей
npm install --production

# Сборка проекта
npm run build
```

### 4. Запустите с PM2

```bash
# Глобальная установка PM2
npm install -g pm2

# Запуск приложения
pm2 start ecosystem.config.js --env production

# Сохранение конфигурации
pm2 save

# Настройка автозапуска
pm2 startup
```

### 5. Настройте Nginx

```bash
# Сделайте скрипт исполняемым
chmod +x setup-nginx.sh

# Запустите настройку Nginx
sudo ./setup-nginx.sh
```

### 6. Проверьте работу

```bash
# Проверьте статус PM2
pm2 status

# Проверьте статус Nginx
sudo systemctl status nginx

# Тест API
curl http://localhost
```

## Команды для управления

### PM2:
```bash
pm2 restart ars-crm-backend    # Перезапуск
pm2 stop ars-crm-backend       # Остановка
pm2 logs ars-crm-backend       # Логи
pm2 monit                      # Мониторинг
```

### Nginx:
```bash
sudo systemctl restart nginx   # Перезапуск
sudo nginx -t                  # Проверка конфигурации
sudo tail -f /var/log/nginx/ars-crm-error.log  # Логи
```

## Обновление приложения

```bash
# Получить обновления
git pull origin main

# Пересобрать проект
npm run build

# Перезапустить PM2
pm2 restart ars-crm-backend
```

## Устранение неполадок

1. **PM2 не запускается**: Проверьте `.env` файл и логи `pm2 logs`
2. **502 Bad Gateway**: Убедитесь, что Node.js работает на порту 3001
3. **База данных недоступна**: Проверьте настройки подключения в `.env`
4. **Файлы не загружаются**: Проверьте права доступа к папке `uploads`
