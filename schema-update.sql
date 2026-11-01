alter table notes add column if not exists pinned boolean not null default false;

alter publication supabase_realtime add table notes;
