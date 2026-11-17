CREATE DATABASE IF NOT EXISTS db_estanteViva;

USE db_estanteViva;

CREATE TABLE livro(
id_livro INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(150) NOT NULL,
autor VARCHAR(120) NOT NULL,
preco DECIMAL(10,2) NOT NULL,
estoque INT NOT NULL
);


/*
insert into livro(titulo, autor, preco, estoque) values('teste','eu','10,00', 5);
SELECT * FROM livro;

DROP TABLE livro;
