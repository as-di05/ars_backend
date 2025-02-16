-- | id            | int unsigned | NO   | PRI | NULL    | auto_increment |
-- | login         | varchar(50)  | NO   | UNI | NULL    |                |
-- | password_hash | varchar(255) | NO   |     | NULL    |                |
-- | role_id       | int unsigned | NO   | MUL | NULL    |                |
-- | first_name    | varchar(100) | NO   |     | NULL    |                |
-- | last_name     | varchar(100) | NO   |     | NULL    |                |
-- | phone_number  | varchar(20)  | YES  |     | NULL    |                |
INSERT INTO users
    (login, password_hash, role_id, first_name, last_name, phone_number)
VALUES('as_di05', '123', 1, "Adilet", "Ulukbekov", "996500005535")


SELECT
    re.id,
    re.id_floor AS idFloor,
    re.id_series AS idSeries,
    re.id_room AS idRoom,
    re.id_deal_type AS idDealType,
    re.id_wall_material AS idWallMaterial,
    re.owner_phone AS ownerPhone,
    re.owner_name AS ownerName,
    re.id_status AS idStatus,
    re.status_updated_at AS statusUpdatedAt,
    re.created_at AS createdAt,
    re.updated_at AS updatedAt,
    re.area,
    re.district,
    re.description,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', ph.id,
                'ownerPrice', ph.owner_price,
                'objectPrice', ph.object_price,
                'currency', ph.currency,
                'createdAt', ph.created_at,
                'updatedAt', ph.updated_at
            )
        )
    FROM re_price_history ph
    WHERE ph.id_real_estate = re.id
    ) AS prices
FROM real_estate_objects re
    INNER JOIN users u ON u.id = re.employee_id
    INNER JOIN categories c ON c.id = re.category_id


JAWSDB_URL: mysql://username:password@host:port/database

mysql://i5cncb2r745iiuwk:d5ue2y4w7z8rabho@gk90usy5ik2otcvi.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/kn1av5tf8p91tiix


mysqldump -h abc123.cleardb.net -u user123 -p'password123' mydatabase > backup.sql

sudo mysqldump -h gk90usy5ik2otcvi.cbetxkdyhwsb.us-east-1.rds.amazonaws.com -u i5cncb2r745iiuwk -p d5ue2y4w7z8rabho database > backup.sql

mysqldump --no-tablespaces -h gk90usy5ik2otcvi.cbetxkdyhwsb.us-east-1.rds.amazonaws.com -u i5cncb2r745iiuwk -p d5ue2y4w7z8rabho database > backup.sql


sudo mysqldump -u root -p ars_crm > backup.sql
