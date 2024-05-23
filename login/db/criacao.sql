create database tubarao;

use tubarao;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY,
usuario varchar (20) NOT NULL,
senha varchar (8) NOT NULL
);

INSERT INTO usuario (idUsuario, usuario, senha) VALUES
(1, 'mari', 'thebest');