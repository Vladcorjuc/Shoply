SET @new_id = 0;
UPDATE products
SET id = (@new_id := @new_id + 1);