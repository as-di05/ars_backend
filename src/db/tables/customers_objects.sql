CREATE TABLE customers_objects (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    category_id INTEGER UNSIGNED NOT NULL,
    employee_id INTEGER UNSIGNED NOT NULL,
    id_district INTEGER UNSIGNED DEFAULT NULL,
    customer_phone VARCHAR(255) DEFAULT NULL,
    customer_name VARCHAR(255) DEFAULT NULL,
    id_status INTEGER UNSIGNED NOT NULL DEFAULT 2,
    status_updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    description VARCHAR(255) DEFAULT NULL,

    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (employee_id) REFERENCES users(id),
    FOREIGN KEY (id_district) REFERENCES districts(id),
    FOREIGN KEY (id_status) REFERENCES re_statuses(id)
);

CREATE TABLE customer_obj_prices (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_customer_obj INTEGER UNSIGNED NOT NULL,
    start_price NUMERIC(15, 2),
    end_price NUMERIC(15, 2),
    currency ENUM('USD','KGS') NOT NULL DEFAULT 'KGS',
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_customer_obj) REFERENCES customers_objects(id) ON DELETE CASCADE
);