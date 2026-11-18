# Paramount Locksmiths website

Full-width React (Vite) website for a residential locksmith in Bradford, with a hidden admin dashboard.
Content, enquiries and images are stored in Vercel (Postgres and Blob).

## Run locally

    npm install
    npm run dev

The public site runs locally with default content. The admin dashboard and contact form need the API,
so test those on the Vercel deployment (or with `npx vercel dev` after linking the project).

## Deploy (GitHub + Vercel)

1. Push this folder to a GitHub repository.
2. In Vercel: Add New > Project > import the repository. Framework: Vite. Build: `npm run build`. Output: `dist`.
3. Storage tab: create a **Postgres** database and a **Blob** store and connect both to the project.
   This adds `POSTGRES_*` and `BLOB_READ_WRITE_TOKEN` automatically.
4. Settings > Environment Variables:
   - `ADMIN_PASSWORD`: a strong password for the dashboard
   - `SESSION_SECRET`: random text of 32+ characters (e.g. `openssl rand -hex 32`)
5. Redeploy.

## Admin dashboard

- URL: `https://YOUR-DOMAIN/paramount-admin-7x3k9q2m` (not linked anywhere on the site, marked noindex).
- Change the path in `src/config.js`, then redeploy.
- Tabs: Business, Homepage, Services, FAQs, Blog, Enquiries.
- Enquiries sent through the contact form appear in the Enquiries tab.

## Before launch: confirm these with the owner

- Phone, email, address, opening hours and map. All are DUMMY values in `src/data.js` and the admin.
  Keep `phoneHref` and `emailHref` matching the displayed values.
- The "24/7" claim wording (hours, FAQ, hero line), which the owner has stated.
- Services and areas. Only residential work is included. Only the Bradford service area is listed.
- Privacy policy: confirm the controller details, retention period and hosting arrangement. It is a draft, not legal advice.
- No ratings, reviews, certificates or memberships are shown. Add them only if the owner confirms them.
