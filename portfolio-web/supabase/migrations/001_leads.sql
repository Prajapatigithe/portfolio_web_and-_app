-- Run once in the Supabase SQL editor or with the Supabase CLI.
create table public.admin_users (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.admin_users enable row level security;
revoke all on public.admin_users from anon, authenticated;
create function public.is_admin() returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.admin_users where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;
create table public.leads (
 id uuid primary key default gen_random_uuid(),
 name text not null check(char_length(name) between 2 and 100),
 email text not null check(char_length(email) <= 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'),
 company text not null default '' check(char_length(company)<=150),
 project_type text not null check(project_type in ('New Mobile App','Existing App Improvement','Bug Fixing','API Integration','Firebase/Supabase','Other')),
 budget text not null check(budget in ('Under $500','$500–$1,000','$1,000–$3,000','$3,000+','Not sure yet')),
 timeline text not null check(timeline in ('As soon as possible','Within 1 month','1–3 months','Flexible / exploring')),
 message text not null check(char_length(message) between 20 and 5000),
 status text not null default 'new' check(status in ('new','contacted','in_progress','completed','rejected')),
 created_at timestamptz not null default now()
);
create index leads_created_at_idx on public.leads(created_at desc);
create index leads_email_created_idx on public.leads(email, created_at desc);
alter table public.leads enable row level security;
revoke all on public.leads from anon, authenticated;
grant select on public.leads to authenticated;
grant update(status) on public.leads to authenticated;
create policy admin_read on public.leads for select to authenticated using ((select public.is_admin()));
create policy admin_update on public.leads for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
-- All public writes pass through validation and a per-email cooldown.
create function public.submit_lead(payload jsonb, website text default '') returns void language plpgsql security definer set search_path = '' as $$
declare clean_email text := lower(trim(payload->>'email'));
begin
 if length(coalesce(website,'')) > 0 then raise exception 'Invalid submission'; end if;
 if payload is null or octet_length(payload::text)>16000 then raise exception 'Invalid submission'; end if;
 perform pg_advisory_xact_lock(hashtextextended(coalesce(clean_email,''),0));
 if exists(select 1 from public.leads where email=clean_email and created_at>now()-interval '2 minutes') then raise exception 'Please wait before submitting again'; end if;
 insert into public.leads(name,email,company,project_type,budget,timeline,message)
 values(trim(payload->>'name'),clean_email,trim(coalesce(payload->>'company','')),payload->>'project_type',payload->>'budget',payload->>'timeline',trim(payload->>'message'));
end;
$$;
revoke all on function public.submit_lead(jsonb,text) from public;
grant execute on function public.submit_lead(jsonb,text) to anon, authenticated;
-- After creating an admin through Supabase Auth, run:
-- insert into public.admin_users(user_id) values ('YOUR_AUTH_USER_UUID');
