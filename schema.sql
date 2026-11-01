create table notes (
  id uuid primary key,
  user_id uuid not null default auth.uid() references auth.users(id),
  text text not null,
  created_at timestamptz not null,
  updated_at timestamptz not null default now(),
  deleted boolean not null default false
);

alter table notes enable row level security;

create policy "own notes only" on notes
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
