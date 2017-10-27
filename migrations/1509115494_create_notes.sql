-- Migration created: Fri Oct 27 10:44:54 EDT 2017

create table if not exists notes (
  id    serial primary key,
  name   varchar(40),
  content text,
  folderId integer,
  createdAt timestamp default now(),
  updatedAt timestamp default now()
);
