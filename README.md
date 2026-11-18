# Paramount Locksmiths website

React (Vite) website with a hidden admin dashboard. Content is stored in Vercel Postgres, and images are uploaded to Vercel Blob.

## Project layout

- `src/` public site and admin dashboard
- `src/data/defaultContent.js` default text, services, areas and blog posts
- `src/config.js` secret admin path
- `api/` serverless functions (login, content, upload)
- `lib/session.js` admin session handling
- `public/logo.png` logo

## Admin dashboard

- URL: `https://YOUR-DOMAIN/paramount-admin-7x3k9q2m`
- The admin page is not linked anywhere on the public site and is marked `noindex`.
- To change the path, edit `ADMIN_PATH` in `src/config.js`, then redeploy.
- Sign in with the `ADMIN_PASSWORD` environment variable.
- Editable: business details, hero text and ticker, services, about, process, areas, blog posts and images.

## Run locally

```bash
npm install
npm run dev
```

The public site works locally with default content. The admin needs the API, so run `npx vercel dev` after linking the project to Vercel, or test on the deployed site.

## Deploy (GitHub + Vercel)

1. Create a GitHub repository and push this folder.
2. In Vercel, click **Add New > Project** and import the repository. The framework is detected as Vite.
3. In the project, open **Storage** and create a **Postgres** database and a **Blob** store, then connect both to the project. This adds `POSTGRES_*` and `BLOB_READ_WRITE_TOKEN` automatically.
4. Under **Settings > Environment Variables**, add:
   - `ADMIN_PASSWORD`: a strong password for the dashboard
   - `SESSION_SECRET`: a random string of at least 32 characters (for example, output of `openssl rand -hex 32`)
5. Redeploy so the variables take effect.

## Before handing over: placeholders to replace

All of these are in the admin under **Business**, **Services** and **Areas**:

- Phone, email, address and opening hours. These are currently DUMMY values.
- Map embed. Copy the real embed URL from Google Maps.
- Service list. Only residential services are included. Remove or edit anything the owner does not offer.
- Areas covered. The list is a starting suggestion. Confirm it with the owner.
- Images. Upload the licensed Magnific images in the **Hero** and **About** tabs and on blog posts.
- Blog posts. The two posts are generic starter content. Replace or delete them.

## Notes

- No ratings, reviews, certificates or accreditations are shown. Add them only if the owner confirms them.
- The contact section uses phone and email links rather than a form. A form needs a delivery service, such as an email provider, to be chosen first.
- `@vercel/postgres` is marked deprecated by its maintainers. It still works, and Vercel's own guide covers moving to Neon's SDK later if needed.
