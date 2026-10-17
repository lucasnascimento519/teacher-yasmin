-- Cole isto no Supabase: menu "SQL Editor" > New query > Run.
-- Cria a tabela onde cada contato do site fica salvo.
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text not null,
  goal text            -- objetivo escolhido no passo 2 do modal
);
-- Segurança: ninguém acessa a tabela pelo navegador; só o servidor do site (service_role).
alter table leads enable row level security;
