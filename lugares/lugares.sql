-- código para crear la tabla "lugares"
create table lugares (
id serial primary key,
nombre varchar(255) not null,
lat float not null,
long float not null);