import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { statuses, type Lead, type LeadStatus } from '../data/site';
export default function Admin() {
  const [authorized, setAuthorized] = useState(false),
    [checking, setChecking] = useState(true),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [leads, setLeads] = useState<Lead[]>([]),
    [filter, setFilter] = useState('all'),
    [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const db = supabase;
    if (!db) {
      setChecking(false);
      return;
    }
    let active = true;
    async function load() {
      setChecking(true);
      setError('');
      try {
        const {
          data: { user },
          error: authError,
        } = await db!.auth.getUser();
        if (!active) return;
        if (!user || authError) {
          setAuthorized(false);
          setLeads([]);
          return;
        }
        const { data: admin, error: adminError } = await db!.rpc('is_admin');
        if (!active) return;
        if (adminError || !admin) {
          setAuthorized(false);
          setLeads([]);
          setError('This account does not have administrator access.');
          return;
        }
        setAuthorized(true);
        const allLeads: Lead[] = [];
        const pageSize = 100;
        for (let offset = 0; ; offset += pageSize) {
          const { data, error } = await db!
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false })
            .order('id', { ascending: false })
            .range(offset, offset + pageSize - 1);
          if (!active) return;
          if (error) throw error;
          allLeads.push(...(data || []));
          if (!data || data.length < pageSize) break;
        }
        setLeads(allLeads);
      } catch {
        if (active)
          setError(
            'Unable to load inquiries. Check your connection and database setup.',
          );
      } finally {
        if (active) setChecking(false);
      }
    }
    void load();
    const {
      data: { subscription },
    } = db.auth.onAuthStateChange(event => {
      if (active && event !== 'INITIAL_SESSION') setRefresh(v => v + 1);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [refresh]);
  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError('');
    const form = new FormData(e.currentTarget);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: String(form.get('email')),
        password: String(form.get('password')),
      });
      if (error) setError('Sign-in failed. Check your email and password.');
    } catch {
      setError('Unable to sign in. Please try again.');
    } finally {
      setBusy(false);
    }
  }
  async function update(id: string, status: LeadStatus) {
    if (!supabase) return;
    setBusy(true);
    setError('');
    try {
      const { data, error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id)
        .select('id')
        .single();
      if (error || !data) throw error;
      setLeads(prev => prev.map(l => (l.id === id ? { ...l, status } : l)));
    } catch {
      setError('Status could not be updated. Please try again.');
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.auth.signOut();
    if (error) setError('Sign-out failed. Please try again.');
    else {
      setAuthorized(false);
      setLeads([]);
    }
    setBusy(false);
  }
  return (
    <main id="main" className="container section admin">
      <p className="eyebrow">PRIVATE WORKSPACE</p>
      <div className="section-heading">
        <h1>
          Project inquiries<span>.</span>
        </h1>
        {authorized && (
          <button className="button outline" disabled={busy} onClick={logout}>
            Sign out
          </button>
        )}
      </div>
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
      {!supabase ? (
        <p className="notice">
          Connect Supabase using the environment variables in .env.example,
          apply the migration, and register your admin account to enable this
          dashboard.
        </p>
      ) : checking ? (
        <p role="status">Checking access and loading inquiries…</p>
      ) : !authorized ? (
        <form className="inquiry-form login-form" onSubmit={login}>
          <h2>Admin login</h2>
          <label>
            Email
            <input type="email" name="email" required autoComplete="username" />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
            />
          </label>
          <button className="button" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      ) : (
        <>
          <div className="admin-stats">
            {['all', 'new', 'contacted', 'in_progress', 'completed'].map(s => (
              <div key={s}>
                <span>{s === 'all' ? 'Total leads' : s.replace('_', ' ')}</span>
                <strong>
                  {s === 'all'
                    ? leads.length
                    : leads.filter(l => l.status === s).length}
                </strong>
              </div>
            ))}
          </div>
          <div className="admin-toolbar">
            <label>
              Filter status{' '}
              <select value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="all">All leads</option>
                {statuses.map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <button
              className="button outline small"
              onClick={() => setRefresh(v => v + 1)}
            >
              Refresh
            </button>
          </div>
          <div className="table-wrap">
            <table>
              <caption>Project inquiries and follow-up status</caption>
              <thead>
                <tr>
                  {[
                    'Client',
                    'Company',
                    'Project',
                    'Budget',
                    'Date',
                    'Status',
                    'Details',
                  ].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads
                  .filter(l => filter === 'all' || l.status === filter)
                  .map(l => (
                    <tr key={l.id}>
                      <td>
                        <b>{l.name}</b>
                        <a href={`mailto:${l.email}`}>{l.email}</a>
                      </td>
                      <td>{l.company || '—'}</td>
                      <td>{l.project_type}</td>
                      <td>{l.budget}</td>
                      <td>{new Date(l.created_at).toLocaleDateString()}</td>
                      <td>
                        <select
                          aria-label={`Status for ${l.name}`}
                          value={l.status}
                          disabled={busy}
                          onChange={e =>
                            update(l.id, e.target.value as LeadStatus)
                          }
                        >
                          {statuses.map(s => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <details>
                          <summary>View brief</summary>
                          <p>Timeline: {l.timeline}</p>
                          <p className="lead-message">{l.message}</p>
                        </details>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {!leads.some(l => filter === 'all' || l.status === filter) && (
            <p className="notice">No inquiries match this view.</p>
          )}
        </>
      )}
    </main>
  );
}
