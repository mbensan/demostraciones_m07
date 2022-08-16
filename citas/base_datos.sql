id serial primary key,
nombre varchar(255) not null,
cita text not null,
fecha date not null default now());