CREATE TABLE rooms (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(50) UNIQUE NOT NULL
);
-- INSERT INTO rooms(label) values('6 - комнатная')

CREATE TABLE floors (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(50) UNIQUE NOT NULL
);
-- INSERT INTO floors(label) values('1 - этажная');

CREATE TABLE re_series (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(50) UNIQUE NOT NULL
);
-- INSERT INTO re_series(label) values('108 серия');

CREATE TABLE deal_types (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(50) UNIQUE NOT NULL
);
-- INSERT INTO deal_types(label) values('Срочная продажа');

CREATE TABLE documents (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(50) UNIQUE NOT NULL
);
-- INSERT INTO documents(label) values('Тех паспорт');

CREATE TABLE re_statuses (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(50) UNIQUE NOT NULL
);
-- INSERT INTO re_statuses(label) values('Неактуально');

CREATE TABLE wall_materials (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(50) UNIQUE NOT NULL
);
-- INSERT INTO wall_materials(label) values('Центральное');

CREATE TABLE re_heatings (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(50) UNIQUE NOT NULL
);
-- INSERT INTO re_heatings(label) values('Центральное');

CREATE TABLE real_estate_objects (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    category_id INTEGER UNSIGNED NOT NULL,
    employee_id INTEGER UNSIGNED NOT NULL,
    id_room INTEGER UNSIGNED DEFAULT NULL,
    area INTEGER UNSIGNED DEFAULT NULL,
    id_floor INTEGER UNSIGNED DEFAULT NULL,
    id_series INTEGER UNSIGNED DEFAULT NULL,
    district VARCHAR(255) DEFAULT NULL,
    id_deal_type INTEGER UNSIGNED DEFAULT NULL,
    id_district INTEGER UNSIGNED DEFAULT NULL,
    id_wall_material INTEGER UNSIGNED DEFAULT NULL,
    id_heating INTEGER UNSIGNED DEFAULT NULL,
    owner_phone VARCHAR(255) DEFAULT NULL,
    owner_name VARCHAR(255) DEFAULT NULL,
    id_status INTEGER UNSIGNED NOT NULL DEFAULT 2,
    status_updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    description VARCHAR(255) DEFAULT NULL,

    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (employee_id) REFERENCES users(id),
    FOREIGN KEY (id_district) REFERENCES districts(id),
    FOREIGN KEY (id_room) REFERENCES rooms(id),
    FOREIGN KEY (id_floor) REFERENCES floors(id),
    FOREIGN KEY (id_series) REFERENCES re_series(id),
    FOREIGN KEY (id_deal_type) REFERENCES deal_types(id),
    FOREIGN KEY (id_wall_material) REFERENCES wall_materials(id),
    FOREIGN KEY (id_heating) REFERENCES re_heatings(id),
    FOREIGN KEY (id_status) REFERENCES re_statuses(id)
);

CREATE TABLE re_documents (
    id_real_estate INTEGER UNSIGNED NOT NULL,
    id_document INTEGER UNSIGNED NOT NULL,
    FOREIGN KEY (id_real_estate) REFERENCES real_estate_objects(id) ON DELETE CASCADE,
    FOREIGN KEY (id_document) REFERENCES documents(id) ON DELETE CASCADE
);

CREATE TABLE re_photos (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_real_estate INTEGER UNSIGNED NOT NULL,
    name VARCHAR(250) NOT NULL,
    FOREIGN KEY (id_real_estate) REFERENCES real_estate_objects(id) ON DELETE CASCADE
);

CREATE TABLE re_price_history (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_real_estate INTEGER UNSIGNED NOT NULL,
    owner_price NUMERIC(15, 2),
    object_price NUMERIC(15, 2),
    currency ENUM('USD','KGS') NOT NULL DEFAULT 'KGS',
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_real_estate) REFERENCES real_estate_objects(id) ON DELETE CASCADE
);

CREATE TABLE re_favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_real_estate INT UNSIGNED NOT NULL,
  id_user INT UNSIGNED NOT NULL,
  FOREIGN KEY (id_real_estate) REFERENCES real_estate_objects(id) ON DELETE CASCADE,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (id_real_estate, id_user)
);

    -- id_heating INTEGER UNSIGNED DEFAULT NULL,
    -- FOREIGN KEY (id_heating) REFERENCES heating(id) ON DELETE SET NULL,