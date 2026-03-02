# Auth Service

**Port:** `3001` | **Base path:** `/api/auth`

---

## Setup

```bash
cd Backend/services/auth-service
npm install
npm run dev
```

The service loads its env from `Backend/.env`. Copy `Backend/.env.example` and fill in the values.

---

## Environment Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing JWTs — use a strong random string |
| `JWT_EXPIRE` | Token expiry (default `1d`) |
| `LINKEDIN_CLIENT_ID` | From LinkedIn Developer Portal |
| `LINKEDIN_CLIENT_SECRET` | From LinkedIn Developer Portal |
| `LINKEDIN_CALLBACK_URL` | Must match what's registered in LinkedIn app (default: `http://localhost:3001/api/auth/linkedin/callback`) |
| `CLIENT_URL` | Frontend URL for CORS and OAuth redirects (default: `http://localhost:5173`) |

---

## LinkedIn OAuth Setup

LinkedIn OAuth is already implemented — you just need credentials.

### 1. Create a LinkedIn App

1. Go to [https://www.linkedin.com/developers/apps](https://www.linkedin.com/developers/apps) and sign in.
2. Click **Create app** and fill in:
   - **App name:** anything (e.g. `Mint Narcissus Dev`)
   - **LinkedIn Page:** link it to the company page — search **Mint Narcissus Dev** or use `https://www.linkedin.com/company/mint-narcissus-dev`
     > You need to be a page admin to link an app. Contact the team lead if you don't have access.
   - Upload any placeholder logo (LinkedIn requires one).
3. Click **Create app**.

### 2. Enable the Right Scopes

1. Go to the **Products** tab of your app.
2. Request **Sign In with LinkedIn using OpenID Connect** — this unlocks the `openid`, `profile`, and `email` scopes the service uses. Approval is usually instant.

### 3. Add the Redirect URI

1. Go to the **Auth** tab.
2. Under **Authorized redirect URLs**, add:
   ```
   http://localhost:3001/api/auth/linkedin/callback
   ```
3. Click **Update**.

### 4. Copy Credentials into `.env`

From the **Auth** tab, copy your **Client ID** and **Client Secret**:

```env
LINKEDIN_CLIENT_ID="your_client_id"
LINKEDIN_CLIENT_SECRET="your_client_secret"
LINKEDIN_CALLBACK_URL="http://localhost:3001/api/auth/linkedin/callback"
```

### 5. Test it

With the service running, open in your browser:
```
http://localhost:3001/api/auth/linkedin
```
You should be redirected to LinkedIn → after authorizing, land on `CLIENT_URL/dashboard` with the `token` cookie set.

---

## Endpoints

| Method | Path | Auth required | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | No | Register with name, email, password |
| `POST` | `/api/auth/login` | No | Login with email, password |
| `POST` | `/api/auth/logout` | No | Clears the `token` cookie |
| `GET` | `/api/auth/me` | Yes | Returns current user's profile |
| `GET` | `/api/auth/linkedin` | No | Starts LinkedIn OAuth (open in browser) |
| `GET` | `/api/auth/linkedin/callback` | No | LinkedIn redirects here automatically |
| `GET` | `/health` | No | Health check |

---

## How Auth Works

After login/register/LinkedIn OAuth, a `token` HTTP-only cookie is set (expires in 1 day). All protected routes read this cookie automatically.

When calling from the frontend, always include credentials:

```js
// fetch
fetch("/api/auth/me", { credentials: "include" });

// axios
axios.get("/api/auth/me", { withCredentials: true });
```

---

## Using the Auth Middleware in Other Services

Each service has its own lightweight `auth` middleware in `src/middleware/auth.js` that reads the same JWT cookie and verifies against the shared MongoDB User collection.

```js
const { auth } = require("../middleware/auth");

router.get("/protected", auth, (req, res) => {
  // req.user._id is available here
});
```

The `auth-service` also exports `adminAuth` which additionally checks `req.user.role === "admin"`.
