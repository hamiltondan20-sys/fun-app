# Horizon Bound Beta Deployment

## Build CSS

Run this before sharing a hosted beta:

```bash
npm install
npm run build:css
```

The app uses `assets/app.css`, which is generated from `src/input.css` and the Tailwind classes found in `code.html`, `scripts/`, and `data/`.

## GitHub Pages

This repo includes a GitHub Pages workflow at `.github/workflows/pages.yml`.

1. Push the repo to GitHub.
2. In GitHub, open **Settings -> Pages**.
3. Set **Build and deployment** to **GitHub Actions**.
4. Push to `main` or run the workflow manually.

The workflow deploys the static files from the repository root. The generated stylesheet is committed at `assets/app.css`, so no cloud build step is required.

## Other Free Hosting Options

- Netlify: drag the project folder into a new static site or connect the repository.
- Vercel: import the repository as a static project.

The root `index.html` forwards visitors to `code.html`, so the public beta link can use the main site URL.

## Beta Data Note

Saved trips, profile fields, booking notes, and backup exports are local to the user's browser during beta. There is no online account sync yet.

## Pre-Share QA

- Open `code.html` on desktop and mobile widths.
- Build a trip from scratch.
- Generate the itinerary.
- Use quick feedback on at least one day.
- Save and restore a draft.
- Mark one booking item as searching or booked.
- Export a local backup.
- Check the FAQ and Contact sections.
