# Backend

Monorepo: **Node.js + Express** with npm workspaces — 4 services + 1 shared package, runnable locally or via Docker Compose.

## Prerequisites

- **Node.js 20+**
- **npm** (v9+ for workspaces)
- **Docker** and **Docker Compose** (for containerized run)

## Structure

```
Backend/
├── services/
│   ├── gateway/          # port 8080
│   ├── auth-service/     # port 3001
│   ├── items-service/    # port 3002
│   └── requests-service/ # port 3003
├── shared/
├── docker-compose.yml
├── .env.example
├── package.json
└── README.md
```

## Local run (no Docker)

1. From the **Backend** folder, install dependencies:
   ```bash
   npm install
   ```

2. Run all services in dev mode (nodemon):
   ```bash
   npm run dev
   ```
   Or run a single service:
   ```bash
   npm run dev:gateway
   npm run dev:auth
   npm run dev:items
   npm run dev:requests
   ```

3. Copy env example and adjust if needed:
   ```bash
   cp .env.example .env
   ```

## Docker Compose (local)

From the **Backend** folder, start Mongo + all 4 services:

```bash
docker compose up --build
```

Stop:

```bash
docker compose down
```

## Health endpoints

Once services are running (locally or via Docker):

| Service          | URL                           |
|------------------|-------------------------------|
| Gateway          | http://localhost:8080/health  |
| Auth service     | http://localhost:3001/health  |
| Items service    | http://localhost:3002/health  |
| Requests service | http://localhost:3003/health  |

Example:

```bash
curl http://localhost:8080/health
# {"status":"ok","service":"gateway"}
```

## Scripts per service

Each service has in its `package.json`:

- `npm run dev` — run with nodemon (watch)
- `npm start` — run with node (production)
