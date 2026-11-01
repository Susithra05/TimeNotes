alter table notes add column if not exists kind text not null default 'note';
alter table notes add column if not exists done boolean not null default false;
alter table notes add column if not exists action text not null default '';
