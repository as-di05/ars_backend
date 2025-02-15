#!/bin/bash

# Настройки
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="backup_$TIMESTAMP.sql"
HOST="gk90usy5ik2otcvi.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"
USER="i5cncb2r745iiuwk"
PASSWORD="d5ue2y4w7z8rabho"
DATABASE="kn1av5tf8p91tiix"
S3_BUCKET="turan-nedvijimost"

# Убедитесь, что mysqldump доступен
echo "Проверка наличия mysqldump..."
which mysqldump || { echo "mysqldump не найден, устанавливаем..."; apt-get update && apt-get install -y mysql-client; }

# Убедитесь, что aws-cli доступен
echo "Проверка наличия aws-cli..."
which aws || { echo "aws-cli не найден, устанавливаем..."; apt-get update && apt-get install -y awscli; }

# Создание дампа базы данных
echo "Создаём бэкап базы данных..."
mysqldump -h "$HOST" -u "$USER" --password="$PASSWORD" "$DATABASE" > "$BACKUP_FILE"

# Проверка успешности дампа
if [ $? -ne 0 ]; then
  echo "Ошибка: не удалось создать бэкап!"
  exit 1
fi

echo "Бэкап успешно создан: $BACKUP_FILE"

# Загрузка в S3
echo "Загружаем бэкап в AWS S3..."
aws s3 cp "$BACKUP_FILE" "s3://$S3_BUCKET/backups/"

# Проверка успешности загрузки в S3
if [ $? -ne 0 ]; then
  echo "Ошибка: не удалось загрузить бэкап в S3!"
  exit 1
fi

echo "Бэкап успешно загружен в S3."

# Очистка временного файла
echo "Удаляем локальный бэкап файл..."
rm "$BACKUP_FILE"
