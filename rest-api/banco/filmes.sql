/* cria e utiliza db_filmes caso não exista */
CREATE DATABASE IF NOT EXISTS db_filmes; 
use db_filmes;
/* cria tabelas users, shows e interaction caso não existam*/
CREATE TABLE IF NOT EXISTS users(
	id_user int primary key auto_increment,
    user_user varchar(150) NOT NULL, 
    password_user varchar(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS shows(
	id_show int primary key auto_increment,
    desc_show varchar(150) NOT NULL,
	id_user int not null,
    concluded boolean
);
CREATE TABLE IF NOT EXISTS interaction(
	id_show int NOT NULL,
    id_user int NOT NULL,
    seguindo boolean, 
    interagir boolean
);
/* atualiza chaves estrangeiras para tabelas shows e interactions */
ALTER TABLE shows ADD CONSTRAINT fk_id_user_show FOREIGN KEY ( id_user ) REFERENCES users ( id_user );
ALTER TABLE interaction ADD CONSTRAINT fk_id_show_interaction FOREIGN KEY ( id_show ) REFERENCES shows ( id_show );
ALTER TABLE interaction ADD CONSTRAINT fk_id_user_interaction FOREIGN KEY ( id_user ) REFERENCES users ( id_user );
