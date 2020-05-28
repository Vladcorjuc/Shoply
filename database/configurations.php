<?php
    require_once "credentials.php";
    require_once "database.php";

    class Table {
        public static function createTable($name, $statement) {
            try {
                Database::getConnection()->exec($statement);
                echo "Table \"" . $name . "\" was created successfully. <br>";
            }
            catch (PDOException $exception) {
                echo $exception->getMessage();
            }
        }

        public static function createInsertProductTrigger() {
            try {
                $statement = "CREATE TRIGGER insert_product 
                    BEFORE INSERT ON products FOR EACH ROW
                    INSERT IGNORE INTO product_log VALUES (NEW.link, NOW(), NEW.price)";
                Database::getConnection()->exec($statement);
                echo "Trigger \"insert_product\" on table \"products\" was created successfully.";
            }
            catch (PDOException $exception) {
                echo $exception->getMessage();
            }
        }

        public static function createTables() {
            Table::createTable("users", "CREATE TABLE IF NOT EXISTS users
                (username VARCHAR(64) NOT NULL PRIMARY KEY,
                password VARCHAR(64) NOT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)");

            Table::createTable("products", "CREATE TABLE IF NOT EXISTS products
                (link VARCHAR(256) NOT NULL PRIMARY KEY,
                title VARCHAR(256) NOT NULL,
                description VARCHAR(1024) DEFAULT NULL,
                price VARCHAR(64) NOT NULL,
                currency VARCHAR(64) NOT NULL,
                offer_num VARCHAR(64) DEFAULT NULL,
                image VARCHAR(256) DEFAULT NULL,
                vendors VARCHAR(4096) DEFAULT NULL)");

            Table::createTable("product_log", "CREATE TABLE IF NOT EXISTS product_log
                (link VARCHAR(256) NOT NULL,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                price INT NOT NULL,
                PRIMARY KEY (link, updated_at))");

            Table::createTable("categories", "CREATE TABLE IF NOT EXISTS categories
                (link VARCHAR(256) NOT NULL,
                category VARCHAR(256) NOT NULL,
                FOREIGN KEY (link) REFERENCES products (link))");
        }
    }

    Table::createTables();
    //Table::createInsertProductTrigger();
