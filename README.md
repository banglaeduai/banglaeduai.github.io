# bengalieduai

Lab website for Bengali EduAI. Next.js static export, deployed to GitHub Pages
at <https://bengalieduai.github.io>.

## Stack

- Next.js 16 (App Router), statically exported via `output: "export"`
- Tailwind CSS v4
- shadcn/ui (Base UI based)
- TypeScript

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes the static site to ./out
```

To preview exactly what gets deployed:

```bash
npm run build
npx serve out
```

## Editing content

Almost everything lives in **`src/lib/site.ts`** — lab name, tagline, email,
affiliation, nav links, research areas, people, publications, and news. Edit
that file and the pages update themselves.

| What                | Where                            |
| ------------------- | -------------------------------- |
| Lab name, contact   | `src/lib/site.ts` → `site`       |
| Nav links           | `src/lib/site.ts` → `nav`        |
| Research areas      | `src/lib/site.ts` → `researchAreas` |
| Members, alumni     | `src/lib/site.ts` → `people`, `alumni` |
| Papers              | `src/lib/site.ts` → `publications` |
| News items          | `src/lib/site.ts` → `news`       |
| Page layout / style | `src/app/*/page.tsx`             |
| Header / footer     | `src/components/site-*.tsx`      |

### Adding a member photo

Drop the image in `public/people/` and set `image: "/people/name.jpg"` on that
person in `src/lib/site.ts`. Without an image, initials are shown.

### Adding a page

Create `src/app/<slug>/page.tsx`, then add `{ href: "/<slug>/", label: "..." }`
to `nav` in `src/lib/site.ts`. Keep the trailing slash — the site is built with
`trailingSlash: true`.

### Adding a shadcn component

```bash
npx shadcn@latest add dialog
```

Note: this shadcn version wraps Base UI, so composition uses a `render` prop
rather than `asChild`:

```tsx
<Button render={<Link href="/research/" />}>Our research</Button>
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
static export and publishes `./out` to GitHub Pages.

One-time setup in the repo settings:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. The repo must be named `bengalieduai.github.io` to serve at the bare
   `https://bengalieduai.github.io` domain.

If you later rename the repo to something else, the site moves to
`https://bengalieduai.github.io/<repo>/` and you must add a matching
`basePath` and `assetPrefix` to `next.config.ts`.

### Static export constraints

There is no server, so these Next.js features are unavailable: Server Actions,
route handlers that read the request, `cookies()`, rewrites/redirects/headers,
ISR, middleware, and default `next/image` optimization (already disabled via
`images.unoptimized`).
