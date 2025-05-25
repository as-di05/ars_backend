#!/bin/bash

# Создаем папку для бэкапов если её нет
mkdir -p database_backups

# Получаем текущую дату
DATE=$(date +"%Y%m%d_%H%M%S")

# Устанавливаем путь к MySQL 8.4
export PATH="/opt/homebrew/opt/mysql@8.4/bin:$PATH"

# Создаем бэкап
mysqldump -h gk90usy5ik2otcvi.cbetxkdyhwsb.us-east-1.rds.amazonaws.com \
         -u i5cncb2r745iiuwk \
         -p'd5ue2y4w7z8rabho' \
         kn1av5tf8p91tiix > "database_backups/backup_${DATE}.sql"

# Удаляем бэкапы старше 7 дней
find database_backups -name "backup_*.sql" -mtime +7 -delete

echo "Backup completed: database_backups/backup_${DATE}.sql" 