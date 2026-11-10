CREATE DATABASE IF NOT EXISTS db_estanteViva;

USE db_estanteViva;

CREATE TABLE livro(
id_livro INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(150) NOT NULL,
autor VARCHAR(120) NOT NULL,
preco DECIMAL(10,2) NOT NULL,
quantidade_estoque INT NOT NULL
);

SELECT * FROM livro;




/*
DROP TABLE livro;
