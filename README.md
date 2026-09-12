# Horizon Bound

Horizon Bound is a beta vacation-planning app that helps travelers build a trip blueprint, generate a day-by-day itinerary, refine it, save local drafts, and export a backup.

## Open Locally

For a quick local check, open `code.html` directly. The interactive planner lives at `/plan/`, and the old `code.html` address remains as a small redirect for existing bookmarks. The generated root `index.html` is the public home page for the GitHub Pages project path.

## Deploy Free With GitHub Pages

This repo includes a GitHub Pages workflow at `.github/workflows/pages.yml`.

1. Push the repo to GitHub.
2. In GitHub, open **Settings -> Pages**.
3. Set **Build and deployment** to **GitHub Actions**.
4. Push to `main` or run the workflow manually.

The public beta link will use the GitHub Pages URL for this repository.

## Beta Data Notice

During beta, saved trips, profile fields, booking notes, and backup exports stay local to the user's browser. There is no online account sync yet.

## CSS Build

The generated stylesheet is committed at `assets/app.css`, so GitHub Pages can serve the app without a build step.

When changing Tailwind utility classes, rebuild CSS:

```bash
pnpm install
pnpm run build:css
```
