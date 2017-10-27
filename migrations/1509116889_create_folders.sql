-- Migration created: Fri Oct 27 11:08:09 EDT 2017

create table if not exists folders (
  id    serial primary key,
  name   varchar(40),
  createdAt timestamp default now(),
  updatedAt timestamp default now()
);
