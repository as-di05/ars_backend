#!/bin/bash

# ===========================================
# ARS CRM Backend - Nginx Setup Script
# ===========================================

set -e

echo "🚀 Настройка Nginx для ARS CRM Backend..."

# Проверка прав администратора
if [ "$EUID" -ne 0 ]; then
    echo "❌ Запустите скрипт с sudo: sudo ./setup-nginx.sh"
    exit 1
fi

# Получение пути к проекту
PROJECT_PATH=$(pwd)
echo "📁 Путь к проекту: $PROJECT_PATH"

# Обновление системы и установка Nginx
echo "📦 Установка Nginx..."
apt-get update -y
apt-get install -y nginx

# Остановка Nginx для настройки
systemctl stop nginx

# Создание конфигурации Nginx
echo "⚙️ Создание конфигурации Nginx..."

cat > /etc/nginx/sites-available/ars-crm << EOF
# ARS CRM Backend - Nginx Configuration

limit_req_zone \$binary_remote_addr zone=api_limit:10m rate=30r/m;
limit_req_zone \$binary_remote_addr zone=login_limit:10m rate=5r/m;

server {
    listen 80;
    server_name _;
    
    client_max_body_size 50M;
    client_body_timeout 30s;
    client_header_timeout 30s;
    keepalive_timeout 65;
    
    access_log /var/log/nginx/ars-crm-access.log;
    error_log /var/log/nginx/ars-crm-error.log warn;
    
    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
    
    # Static files
    location /static/ {
        alias $PROJECT_PATH/public/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files \$uri \$uri/ =404;
    }
    
    # Uploaded files
    location /uploads/ {
        alias $PROJECT_PATH/uploads/;
        expires 30d;
        add_header Cache-Control "public";
        location ~* \\.(php|jsp|asp|sh|py|pl|exe)\$ {
            deny all;
        }
        try_files \$uri =404;
    }
    
    # API endpoints
    location /api/ {
        limit_req zone=api_limit burst=10 nodelay;
        proxy_pass http://127.0.0.1:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_connect_timeout 10s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }
    
    # Auth endpoint
    location /auth/ {
        limit_req zone=login_limit burst=3 nodelay;
        proxy_pass http://127.0.0.1:3001/auth/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_connect_timeout 10s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }
    
    # Other API routes
    location ~ ^/(users|categories|real_estate|customers)/ {
        limit_req zone=api_limit burst=10 nodelay;
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_connect_timeout 10s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Health check
    location /health {
        proxy_pass http://127.0.0.1:3001/health;
        proxy_set_header Host \$host;
        access_log off;
    }
    
    # Frontend files
    location / {
        root $PROJECT_PATH/public;
        try_files \$uri \$uri/ /index.html;
        
        location ~* \\.html\$ {
            expires 1h;
            add_header Cache-Control "public, must-revalidate";
        }
        
        location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)\$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Block access to sensitive files
    location ~ /\\. {
        deny all;
    }
    
    location ~ \\.(env|log|ini|conf|bak|sql)\$ {
        deny all;
    }
    
    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
EOF

# Создание необходимых директорий
echo "📁 Создание директорий..."
mkdir -p "$PROJECT_PATH/uploads"

# Установка прав доступа
echo "🔐 Установка прав доступа..."
chown -R www-data:www-data "$PROJECT_PATH/public" "$PROJECT_PATH/uploads"
chmod -R 755 "$PROJECT_PATH/public" "$PROJECT_PATH/uploads"

# Отключение стандартного сайта
echo "🔄 Настройка сайтов..."
rm -f /etc/nginx/sites-enabled/default

# Активация нашего сайта
ln -sf /etc/nginx/sites-available/ars-crm /etc/nginx/sites-enabled/

# Проверка конфигурации
echo "🔍 Проверка конфигурации..."
if nginx -t; then
    echo "✅ Конфигурация корректна"
else
    echo "❌ Ошибка в конфигурации"
    exit 1
fi

# Запуск Nginx
echo "🚀 Запуск Nginx..."
systemctl start nginx
systemctl enable nginx

# Проверка статуса
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx запущен"
else
    echo "❌ Nginx не запущен"
    systemctl status nginx
    exit 1
fi

echo ""
echo "🎉 Nginx настроен успешно!"
echo ""
echo "📋 Проверьте:"
echo "• Статус Node.js: pm2 status"
echo "• Тест API: curl http://localhost"
echo "• Логи: sudo tail -f /var/log/nginx/ars-crm-error.log"
echo ""
echo "🌐 Сайт доступен по IP: http://$(hostname -I | awk '{print $1}')"
