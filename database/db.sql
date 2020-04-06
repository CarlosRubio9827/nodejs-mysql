CREATE DATABASE database_links;

USE database_links;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    username VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
);

ALTER TABLE users
    add PRIMARY KEY(id);
ALTER TABLE users
    MODIFY id INT (11) NOT NULL auto_increment, auto_increment = 2;

describe users;