#!/bin/bash

echo "🚀 Начинаем деплой нового бэкенда на сервер..."

# 1. Остановить текущее приложение
echo "📱 Останавливаем текущее приложение..."
pm2 stop ars-backend 2>/dev/null || echo "Приложение не запущено"

# 2. Удалить старую версию
echo "🗑️ Удаляем старую версию..."
cd /var/www
rm -rf ars_backend

# 3. Распаковать новый архив
echo "📦 Распаковываем новый бэкенд..."
tar -xzf ars_backend_new.tar.gz
mv ars_backend-* ars_backend 2>/dev/null || echo "Папка уже переименована"

# 4. Перейти в папку проекта
cd ars_backend

# 5. Установить зависимости
echo "📚 Устанавливаем зависимости..."
npm install --production

# 6. Пересобрать проект
echo "🔨 Собираем проект..."
npm run build

# 7. Проверить, что dist создался
if [ ! -d "dist" ]; then
    echo "❌ Ошибка: папка dist не создалась!"
    exit 1
fi

# 8. Проверить, что public содержит фронтенд
if [ ! -f "public/index.html" ]; then
    echo "❌ Ошибка: фронтенд не найден в public!"
    exit 1
fi

# 9. Настроить права доступа
echo "🔐 Настраиваем права доступа..."
chown -R www-data:www-data /var/www/ars_backend
chmod -R 755 /var/www/ars_backend

# 10. Запустить приложение через PM2
echo "🚀 Запускаем приложение..."
pm2 start dist/main.js --name ars-backend
pm2 save

# 11. Проверить статус PM2
echo "📊 Статус приложения:"
pm2 status

# 12. Перезапустить Nginx
echo "🌐 Перезапускаем Nginx..."
nginx -t && systemctl restart nginx

# 13. Проверить статус Nginx
echo "📊 Статус Nginx:"
systemctl status nginx --no-pager -l

echo "✅ Деплой завершен!"
echo "🌍 Проверьте сайт: https://turan-nedvijimost.kg/"
echo "📱 Проверьте логи: pm2 logs ars-backend"
