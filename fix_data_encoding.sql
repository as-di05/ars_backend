-- Скрипт для исправления кодировки данных в БД
-- ВАЖНО: Запустите этот скрипт с правильной кодировкой:
-- mysql -u username -p database_name < fix_data_encoding.sql --default-character-set=utf8mb4
-- ИЛИ выполните в MySQL клиенте с установленной кодировкой:

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET CHARACTER SET utf8mb4;
SET character_set_connection = utf8mb4;

-- Исправляем таблицу roles (из backup файла)
UPDATE roles SET name = 'Управляющий' WHERE id = 1;
UPDATE roles SET name = 'Менеджер' WHERE id = 2;
UPDATE roles SET name = 'Сотрудник' WHERE id = 3;

-- Исправляем пользователя 2 (Адилет Улукбеков) - из backup файла
UPDATE users SET 
  first_name = 'Адилет',
  last_name = 'Улукбеков'
WHERE id = 2;

-- Исправляем других пользователей из backup (если нужно)
-- UPDATE users SET first_name = 'нурдаулет', last_name = 'эрматов' WHERE id = 6;
-- UPDATE users SET first_name = 'даниэл', last_name = 'ракманов' WHERE id = 7;
-- UPDATE users SET first_name = 'азамат', last_name = 'Азимов' WHERE id = 8;
-- UPDATE users SET first_name = 'арзымат', last_name = 'талантбеков' WHERE id = 9;
-- UPDATE users SET first_name = 'автандил', last_name = 'эркебеков' WHERE id = 10;
-- UPDATE users SET first_name = 'дастан', last_name = 'замиров' WHERE id = 11;

-- Проверяем результат
SELECT id, name FROM roles ORDER BY id;
SELECT id, login, first_name, last_name FROM users WHERE id IN (1, 2);

