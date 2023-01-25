DROP DATABASE IF EXISTS note_taker_db;
CREATE DATABASE note_taker_db;

USE note_taker_db;

CREATE TABLE note (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(25) NOT NULL,
    text VARCHAR(4000) NOT NULL
);