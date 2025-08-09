drop database if exists todolistdb;
create database todolistdb character set utf8;
use todolistdb;

create table tache (
    reference varchar(128) not null,
    objet varchar(128),
    description text,
    priorite varchar(128),
    statut varchar(128),
    date_echeance date,
    primary key(reference)
);