-- Migration created: Fri Nov 17 21:37:47 EST 2017

create table if not exists users (
  id    serial primary key,
  username   varchar(40),
  email varchar(40),
  password text,
  createdAt timestamp default now(),
  updatedAt timestamp default now()
);
