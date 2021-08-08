CREATE DATABASE mvd;
USE MVD;

DROP TABLE IF EXISTS Workers;
DROP TABLE IF EXISTS Tests;
DROP TABLE IF EXISTS DataTests;
DROP TABLE IF EXISTS TestComp;

CREATE TABLE Workers (
	`id_worker` VARCHAR(24) NOT NULL,
	`login` VARCHAR(16) NOT NULL,
	`password` VARCHAR(16) NOT NULL,
	`name` VARCHAR(48) NOT NULL,
	`status` VARCHAR(48) NOT NULL,
	PRIMARY KEY(`id_worker`, `login`, `name`, `status`)
)ENGINE=InnoDB;

CREATE TABLE Tests (
	`id_test` VARCHAR(24) NOT NULL,
	`name_test` VARCHAR(120) NOT NULL,
	`description` VARCHAR(240) NOT NULL,
	`time` TIME NOT NULL,
	PRIMARY KEY(`id_test`)
)ENGINE=InnoDB;

CREATE TABLE DataTests (
	`id_test` VARCHAR(24) NOT NULL,
	`id_question` VARCHAR(24) NOT NULL,
	`question` VARCHAR(240) NOT NULL,
	`answer` VARCHAR(240) NOT NULL,
	PRIMARY KEY(`id_test`, `id_question`),
	FOREIGN KEY(`id_test`)
	REFERENCES `Tests` (`id_test`) 
	ON DELETE NO ACTION
	ON UPDATE CASCADE
)ENGINE=InnoDB;

CREATE TABLE TestComp (
	`id_test` VARCHAR(24) NOT NULL,
	`id_worker` VARCHAR(24) NOT NULL,
	`accepted` INT NOT NULL,
	`result` INT NULL,
	`time_start` TIME NULL,
	`date_start` DATE NULL,
	PRIMARY KEY(`id_test`, `id_worker`),
	FOREIGN KEY(`id_test`)
	REFERENCES Tests (`id_test`)
	ON DELETE NO ACTION
	ON UPDATE CASCADE,
	FOREIGN KEY(`id_worker`)
	REFERENCES Workers (`id_worker`)
	ON DELETE NO ACTION
	ON UPDATE CASCADE
)ENGINE=InnoDB;

