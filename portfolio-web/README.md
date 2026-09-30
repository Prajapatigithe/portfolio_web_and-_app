# Ankit Kumar — freelance portfolio

This improves the existing React + TypeScript + Vite website. The sibling React Native Android/iOS application is unchanged.

## Local development

Requires Node 22.12+ (or a supported newer LTS).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

The inquiry form defaults to WhatsApp (`VITE_INQUIRY_CHANNEL=whatsapp`). Submitting it opens a prefilled message to +91 9569073981 with the name, email, company, project type, budget, timeline, and brief. The visitor must review the message and press Send in WhatsApp. The form preserves their input and provides a fallback link if the popup is blocked. This mode needs no backend and does not store leads in the admin dashboard.

To use database submissions later, configure Supabase and set `VITE_INQUIRY_CHANNEL=supabase`. If Supabase is missing, the form falls back to WhatsApp with matching button/instructions.

## Supabase setup

1. Create your Supabase project. Run `supabase/migrations/001_leads.sql` once in its SQL editor (or apply it with the Supabase CLI).
2. Add the project URL and **publishable** key to `.env.local` using the names in `.env.example`. Legacy browser-safe anon keys also work. Never use a service-role or secret key in a `VITE_*` variable; all Vite variables are public.
3. Create your admin user in Supabase Authentication. Disable public signups if you do not need them. Add that user's UUID to the allowlist using the SQL editor:

   ```sql
   insert into public.admin_users(user_id) values ('YOUR_AUTH_USER_UUID');
   ```

4. Restart Vite, open `/admin`, and sign in with that user's email/password.
5. Set `VITE_INQUIRY_CHANNEL=supabase` and restart Vite. Submit a real inquiry and confirm it appears in the dashboard. Test status updates and sign-out before publishing.

The database is the authorization boundary. Anonymous visitors can only call `submit_lead`; it validates constrained fields, ignores injected status/ID fields, rejects the honeypot, and limits submissions per email to one per two minutes. Only an explicitly allowlisted Auth user can read leads or update their status. Ordinary authenticated users cannot read leads or add themselves to the allowlist. Only the `status` column can be updated by admins through the public API. No browser has delete permission.

The per-email cooldown and honeypot are basic abuse controls, not a comprehensive bot defense. If abuse occurs, put submission behind an Edge Function with CAPTCHA verification and IP-based rate limiting. Set a retention policy for stored contact details appropriate to your business.

## Production deployment and SEO

Set the deployment root to `portfolio-web`, build command to `npm run build`, and output directory to `dist`. Set `VITE_SITE_URL` to your actual HTTPS origin. WhatsApp inquiries work without any Supabase variables. For database submissions and admin access, also set `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, and `VITE_INQUIRY_CHANNEL=supabase`. Build again whenever these change.

Vercel and Netlify SPA fallbacks are supplied. Other hosts must serve `index.html` for `/admin` and `/projects/*`. Domain-root deployment is assumed; GitHub Pages requires additional path/fallback configuration.

The build generates `sitemap.xml`, a domain-specific robots file, canonical tags, and an absolute Open Graph image URL using `VITE_SITE_URL`, or the existing production origin in `src/data/seo.json` by default. The static social image is `public/social-card.png`; regenerate it with `node scripts/social-card.mjs` with Chrome installed. Admin is marked noindex in the client and excluded by robots. Search engines still need to execute JavaScript for page content; server rendering/prerendering is a future enhancement for deeper indexing.

## Content and design

- `src/data/site.ts`: contact details, projects, skills, form options, status types.
- `src/components/sections`: reusable home page sections.
- `src/components/ui/PhoneMockup.tsx`: lightweight CSS/SVG interface illustration.
- `src/pages/ProjectDetail.tsx`: `/projects/:slug` case studies.
- `src/pages/Admin.tsx`: lazy-loaded Auth and lead management UI.
- `src/index.css`: dark responsive design, focus indicators, reduced-motion support.
- `supabase/migrations/001_leads.sql`: schema, validation, privileges, RLS, and submission RPC.

The portrait, resume, contact details, existing routes, and inquiry flows are preserved. Project previews use optimized WebP images; original assets and provenance remain in `public/projects/SOURCES.md`. NewsTapri uses the mobile presentation adapted from its original composite, Khajanchi uses the supplied screenshots with status indicators cleaned, and AchiDeal retains the provided mobile previews. These presentation assets do not establish store releases or platform support.

### Conversion content configuration

- Set `VITE_AVAILABLE_FOR_FREELANCE=true` to show the availability badge; it is hidden by default.
- Add verified reviews to `testimonials` in `src/data/site.ts`. The section and navbar link remain hidden for an empty array. Reviews support name, role, company, quote, and optional image.
- Project links support `playStore`, `appStore`, `github`, `website`, and the existing source URL. Missing URLs produce no buttons.
- Set project `platforms` only to confirmed Android/iOS targets. Android is shown for the supplied Khajanchi screen; other platform details remain unspecified.
- Keep project results descriptive until measured outcomes are available. No ratings, downloads, or client statistics have been added.
- Run `node scripts/optimize-images.mjs` with Chrome installed after replacing the original images. This only resizes and re-encodes images as WebP, preserving original files.
- Home-page structured data describes a Person. No business address, client review, or business credentials are invented. Metadata, canonical URLs, Twitter cards, and sitemap use the production origin or the configured override.

## Analytics

Analytics is disabled by default. Optional Google Analytics uses `VITE_GA_MEASUREMENT_ID` and loads only when `localStorage['analytics-consent']` equals `granted`. Integrate your consent UI before enabling it; after consent, call `initializeAnalytics` or reload. No third-party analytics request is made without both the ID and consent.

## Checks

```sh
npm run build
npm run lint
npm test
npm run test:db
```

Browser tests require Google Chrome locally (or adapt `playwright.config.ts` to installed Playwright browsers). They exercise responsive navigation, route reloads, form validation, complete WhatsApp message encoding and popup fallback, project image loading, and console errors. WhatsApp is stubbed in tests; no messages are sent. A second local server uses test-only credentials and intercepted responses to check submission success/error and admin login, status changes, and logout. Database tests use an isolated in-memory PostgreSQL engine with stubbed Supabase Auth roles; they execute the actual migration and verify validation, cooldown, RLS, allowlisting, and status-only updates. They do not replace a live Supabase smoke test.
