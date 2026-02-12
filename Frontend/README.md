# Career Closet Frontend

Frontend application for the Career Closet platform (Team Mint Narcissus, Spring
2026).

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
cd Frontend
npm install
```

### Run Development Server

```bash
npm run dev
```

Vite will print the local URL (typically `http://localhost:5173`).

## Available Scripts

From `Frontend/package.json`:

- `npm run dev` - start Vite dev server
- `npm run build` - create production build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint
- `npm run format` - run Prettier on `src/**/*.{js,ts,json,css}`

## Routing and Role Modes

Top-level routing is role-driven:

- If `activeRole === "borrower"`, app renders `BorrowerLayout`.
- If `activeRole === "lender"`, app renders `LenderLayout`.

Role is stored in Redux and persisted via `localStorage` key `activeRole`.

### Borrower Routes

- `/` -> `Browse`
- `/saved` -> `Saved`
- `/messages` -> `Messages`
- `/settings` -> `Settings`
- `*` -> `PageNotFound`

### Lender Routes

- `/` -> `MyOutfits`
- `/requests` -> `Requests`
- `/messages` -> `Messages`
- `/list` -> `ListOutfit`
- `/settings` -> `Settings`
- `*` -> `PageNotFound`

## Project Structure

```text
Frontend/
  src/
    components/
      borrower/
      layout/
      lender/
      outfits/
      shared/
      ui/
    layouts/
      BorrowerLayout.jsx
      LenderLayout.jsx
    pages/
      borrower/
      lender/
      auth/
      admin/
      Messages.jsx
      Settings.jsx
      PageNotFound.jsx
    store/
      store.js
      authSlice.js
      roleSlice.js
    lib/
    utils/
    App.jsx
    main.jsx
    index.css
```

## Styling and Aliases

- Global design tokens and app colors are defined in `src/index.css`.
- Path alias `@` maps to `src` (configured in `vite.config.js` and
  `jsconfig.json`).

## Notes for Contributors

- Keep imports using `@/...` alias where possible. (Suggestion: Use VSCode
  extension of `Path Intellisense` by `Christian Kohler`)
- Follow existing component organization under `src/components`.
- To add an icon, import in `mint-narcissus/Frontend/src/utils/icons.js` and
  then export it from there.
- Before opening a PR, run:

```bash
npm run lint
npm run format
```