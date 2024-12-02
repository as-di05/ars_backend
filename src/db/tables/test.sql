-- | id            | int unsigned | NO   | PRI | NULL    | auto_increment |
-- | login         | varchar(50)  | NO   | UNI | NULL    |                |
-- | password_hash | varchar(255) | NO   |     | NULL    |                |
-- | role_id       | int unsigned | NO   | MUL | NULL    |                |
-- | first_name    | varchar(100) | NO   |     | NULL    |                |
-- | last_name     | varchar(100) | NO   |     | NULL    |                |
-- | phone_number  | varchar(20)  | YES  |     | NULL    |                |

INSERT INTO users (login, password_hash, role_id, first_name, last_name, phone_number) VALUES('as_di05', '123', 1, "Adilet", "Ulukbekov", "996500005535")