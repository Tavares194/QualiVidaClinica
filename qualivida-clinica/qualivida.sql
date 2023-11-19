CREATE TABLE IF NOT EXISTS `qualivida`.`specialties` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `default_name` VARCHAR(255) NOT NULL,
  `default_price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 23
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci