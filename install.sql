CREATE DATABASE IF NOT EXISTS `e-sports` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `e-sports`;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TEXT
);