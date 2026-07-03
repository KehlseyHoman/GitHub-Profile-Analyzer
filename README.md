# GitHub Profile Analyzer

Look up any public GitHub account and read it back as a commit log — profile
stats, a language breakdown styled as a diff bar, and repos sorted by stars.

Built with React, TypeScript, and Vite. No backend, no auth — talks directly
to the public GitHub REST API from the browser.

![GitHub Profile Analyzer screenshot](src/screenshots/Screenshot%202026-07-03%20at%2012.30.53%20PM.png)

## Stack

- React 18 + TypeScript
- Vite
- Plain CSS (no framework) — custom design system, see `src/index.css`
- [GitHub REST API](https://docs.github.com/en/rest) (`/users/:username`, `/users/:username/repos`)

## Run locally

```bash
npm install
npm run dev
```

Then open the printed localhost URL and search a GitHub username.

## Notes

- Unauthenticated GitHub API requests are capped at 60/hour per IP. If you hit
  the limit, wait a bit — this app surfaces that as an error message rather
  than failing silently.
- Language breakdown counts each user's non-fork repos by primary language
  (not byte count), capped to the top 6 languages, to keep the app to two
  lightweight API calls per search.
- Repo list excludes forks, sorts by star count, and shows the top 15.

## Possible next steps

- Add a GitHub token input to raise the rate limit
- Cache recent searches in localStorage
- Pull actual byte-level language stats via the `/languages` endpoint
