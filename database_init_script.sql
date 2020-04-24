CREATE TABLE `products` (
  `link` varchar(200) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `price` varchar(45) NOT NULL,
  `currency` varchar(45) NOT NULL,
  `offer_num` varchar(45) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `vendors` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`link`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `product_log` (
  `link` varchar(200) NOT NULL,
  `date_update` timestamp NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`link`,`date_update`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

drop trigger products_insertion;
DELIMITER $$
CREATE TRIGGER products_insertion 
BEFORE INSERT 
ON products FOR EACH ROW 
BEGIN
	INSERT IGNORE INTO product_log(link,date_update,price) VALUES(NEW.link,NOW(),NEW.price);
END$$
DELIMITER ;
CREATE TABLE categories(
	genre varchar(200) NOT NULL,
    link VARCHAR(200) NOT NULL,
    foreign key(link)
		references products(link)
);
DELETE FROM categories;
delete from product_log;
DELETE FROM products;

SELECT COUNT(*) FROM PRODUCTs;
SELECT COUNT(*) FROM categories;
