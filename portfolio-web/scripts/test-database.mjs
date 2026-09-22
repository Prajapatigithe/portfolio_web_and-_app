import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const db = new PGlite();
await db.exec(`create role anon; create role authenticated; create schema auth;
create table auth.users(id uuid primary key);
create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
grant usage on schema public,auth to anon,authenticated;
grant execute on function auth.uid() to anon,authenticated;
insert into auth.users values ('00000000-0000-0000-0000-000000000001'),('00000000-0000-0000-0000-000000000002');`);
await db.exec(readFileSync('supabase/migrations/001_leads.sql', 'utf8'));
await db.exec(
  `insert into public.admin_users values ('00000000-0000-0000-0000-000000000001');set role anon;`,
);
const payload = {
  name: 'Test Client',
  email: 'client@example.com',
  company: 'Example',
  project_type: 'New Mobile App',
  budget: 'Not sure yet',
  timeline: 'Within 1 month',
  message: 'Build a mobile app for local shoppers.',
  status: 'completed',
};
await db.query('select public.submit_lead($1::jsonb,$2)', [
  JSON.stringify(payload),
  '',
]);
await assert.rejects(
  db.query('select * from public.leads'),
  /permission denied/,
);
await assert.rejects(
  db.query('select public.submit_lead($1::jsonb,$2)', [
    JSON.stringify(payload),
    '',
  ]),
  /wait/,
);
await assert.rejects(
  db.query('select public.submit_lead($1::jsonb,$2)', [
    JSON.stringify({ ...payload, email: 'bad' }),
    '',
  ]),
  /check constraint/,
);
await assert.rejects(
  db.query('select public.submit_lead($1::jsonb,$2)', [
    JSON.stringify({ ...payload, email: 'next@example.com', message: 'short' }),
    '',
  ]),
  /check constraint/,
);
await assert.rejects(
  db.query('select public.submit_lead($1::jsonb,$2)', [
    JSON.stringify(payload),
    'spam',
  ]),
  /Invalid/,
);
await db.exec(
  `reset role;set role authenticated;set request.jwt.claim.sub='00000000-0000-0000-0000-000000000002';`,
);
assert.equal((await db.query('select * from public.leads')).rows.length, 0);
assert.equal(
  (await db.query("update public.leads set status='completed' returning id"))
    .rows.length,
  0,
);
await assert.rejects(
  db.query(
    "insert into public.admin_users values ('00000000-0000-0000-0000-000000000002')",
  ),
  /permission denied/,
);
await db.exec(
  "set request.jwt.claim.sub='00000000-0000-0000-0000-000000000001'",
);
const leads = (await db.query('select * from public.leads')).rows;
assert.equal(leads.length, 1);
assert.equal(leads[0].status, 'new');
assert.equal(
  (
    await db.query(
      "update public.leads set status='contacted' returning status",
    )
  ).rows[0].status,
  'contacted',
);
await assert.rejects(
  db.query("update public.leads set email='other@example.com'"),
  /permission denied/,
);
await assert.rejects(
  db.query("update public.leads set status='invalid'"),
  /check constraint/,
);
console.log(
  'Database checks passed: submission, validation, cooldown, RLS, admin allowlist, status-only updates.',
);
await db.close();
