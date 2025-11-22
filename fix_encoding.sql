-- Скрипт для исправления кодировки данных в БД
-- Запустите этот скрипт в MySQL, если данные отображаются как кракозябры

-- 1. Устанавливаем кодировку для текущей сессии
SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Проверяем текущую кодировку таблиц
SELECT 
    TABLE_NAME,
    TABLE_COLLATION 
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = DATABASE()
AND TABLE_TYPE = 'BASE TABLE';

-- 3. Исправляем кодировку для таблиц с текстовыми данными
-- (замените 'your_database_name' на имя вашей БД)

-- Districts
ALTER TABLE districts CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Wall materials
ALTER TABLE wall_materials CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Re heatings
ALTER TABLE re_heatings CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Re series
ALTER TABLE re_series CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Deal types
ALTER TABLE deal_types CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Categories
ALTER TABLE categories CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Documents
ALTER TABLE documents CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Roles
ALTER TABLE roles CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Users
ALTER TABLE users CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Real estate objects
ALTER TABLE real_estate_objects CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Customers objects
ALTER TABLE customers_objects CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 4. Если данные уже сохранены неправильно, их нужно пересохранить
-- Восстановите данные из правильного backup файла с установленной кодировкой:
-- mysql -u username -p database_name < backup.sql --default-character-set=utf8mb4

-- ИЛИ обновите данные вручную, если их немного:
-- UPDATE districts SET label = 'Штукатурка' WHERE id = 6;

