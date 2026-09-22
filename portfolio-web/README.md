# Ankit Kumar — freelance portfolio

This improves the existing React + TypeScript + Vite website. The sibling React Native Android/iOS application is unchanged.

## Local development

Requires Node 22.12+ (or a supported newer LTS).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Without Supabase configuration, the portfolio works and the contact form reports that it is not connected. Email and WhatsApp links remain usable. No lead is falsely marked as submitted.

## Supabase setup

1. Create your Supabase project. Run `supabase/migrations/001_leads.sql` once in its SQL editor (or apply it with the Supabase CLI).
2. Add the project URL and **publishable** key to `.env.local` using the names in `.env.example`. Legacy browser-safe anon keys also work. Never use a service-role or secret key in a `VITE_*` variable; all Vite variables are public.
3. Create your admin user in Supabase Authentication. Disable public signups if you do not need them. Add that user's UUID to the allowlist using the SQL editor:

   ```sql
   insert into public.admin_users(user_id) values ('YOUR_AUTH_USER_UUID');
   ```

4. Restart Vite, open `/admin`, and sign in with that user's email/password.
5. Submit a real inquiry and confirm it appears in the dashboard. Test status updates and sign-out before publishing.

The database is the authorization boundary. Anonymous visitors can only call `submit_lead`; it validates constrained fields, ignores injected status/ID fields, rejects the honeypot, and limits submissions per email to one per two minutes. Only an explicitly allowlisted Auth user can read leads or update their status. Ordinary authenticated users cannot read leads or add themselves to the allowlist. Only the `status` column can be updated by admins through the public API. No browser has delete permission.

The per-email cooldown and honeypot are basic abuse controls, not a comprehensive bot defense. If abuse occurs, put submission behind an Edge Function with CAPTCHA verification and IP-based rate limiting. Set a retention policy for stored contact details appropriate to your business.

## Production deployment and SEO

Set the deployment root to `portfolio-web`, build command to `npm run build`, and output directory to `dist`. Set the three required deployment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, and `VITE_SITE_URL` (your actual HTTPS origin). Build again whenever these change.

Vercel and Netlify SPA fallbacks are supplied. Other hosts must serve `index.html` for `/admin` and `/projects/*`. Domain-root deployment is assumed; GitHub Pages requires additional path/fallback configuration.

The build generates `sitemap.xml`, a domain-specific robots file, canonical tags, and an absolute Open Graph image URL when `VITE_SITE_URL` is set. The static social image is `public/social-card.png`; regenerate it with `node scripts/social-card.mjs` with Chrome installed. Admin is marked noindex in the client and excluded by robots. Search engines still need to execute JavaScript for page content; server rendering/prerendering is a future enhancement for deeper indexing.

## Content and design

- `src/data/site.ts`: contact details, projects, skills, form options, status types.
- `src/components/sections`: reusable home page sections.
- `src/components/ui/PhoneMockup.tsx`: lightweight CSS/SVG interface illustration.
- `src/pages/ProjectDetail.tsx`: `/projects/:slug` case studies.
- `src/pages/Admin.tsx`: lazy-loaded Auth and lead management UI.
- `src/index.css`: dark responsive design, focus indicators, reduced-motion support.
- `supabase/migrations/001_leads.sql`: schema, validation, privileges, RLS, and submission RPC.

Existing project names/descriptions, portrait, resume, and contact information are reused. No project-specific repository/demo URLs or verified screenshots/results were supplied. Illustrations and the testimonial are explicitly labeled examples; no fabricated client quotes or metrics are presented as evidence. Replace these with approved screenshots, exact contributions, release/repository links, outcomes, and testimonials before marketing the site. Confirm that `public/Resume.pdf` remains current.

## Analytics

Analytics is disabled by default. Optional Google Analytics uses `VITE_GA_MEASUREMENT_ID` and loads only when `localStorage['analytics-consent']` equals `granted`. Integrate your consent UI before enabling it; after consent, call `initializeAnalytics` or reload. No third-party analytics request is made without both the ID and consent.

## Checks

```sh
npm run build
npm run lint
npm test
npm run test:db
```

Browser tests require Google Chrome locally (or adapt `playwright.config.ts` to installed Playwright browsers). They exercise responsive navigation, route reloads, form validation, unconfigured backend behavior, and console errors. A second local server uses test-only credentials and intercepted responses to check submission success/error and admin login, status changes, and logout. Database tests use an isolated in-memory PostgreSQL engine with stubbed Supabase Auth roles; they execute the actual migration and verify validation, cooldown, RLS, allowlisting, and status-only updates. They do not replace a live Supabase smoke test.
