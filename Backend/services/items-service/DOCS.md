# Items Service — API Reference

**Base URL:** `http://localhost:3002`
**Port:** `3002` (set via `PORT` env var)
**MongoDB collection:** `items` (shared with messaging-service)

---

## Authentication & Guards

Every route (except the internal route) requires a valid JWT **httpOnly cookie** named `token`, issued by auth-service on login.

Two additional middleware guards sit on most routes:

| Guard | What it checks | Response on failure |
|---|---|---|
| `auth` | Valid JWT cookie; user exists and is not restricted | 401 / 403 |
| `requireProfileComplete` | `isProfileComplete: true` in MongoDB | 403 |
| `requireRole("lender")` | `activeRole === "lender"` in MongoDB | 403 |
| `requireRole("borrower")` | `activeRole === "borrower"` in MongoDB | 403 |

---

## Public Routes (require JWT only)

### `GET /api/items/:id`
Returns the full detail of a single item. Any authenticated user can call this regardless of role.

**Response:** Item object (see Data Model below).

---

## Borrower Routes (require JWT + profile complete + activeRole = borrower)

### `GET /api/items`
Paginated feed of all **Available** items. Used by the Browse page.

**Query params:**

| Param | Type | Description |
|---|---|---|
| `size` | string | Filter by size (e.g. `S`, `M`, `L`) |
| `category` | string | `Formal` \| `Semi-formal` \| `Business Casual` |
| `interviewType` | string | `Tech` \| `Corporate` \| `Finance` \| `General` \| `Other` |
| `page` | number | Page number (default `1`) |
| `limit` | number | Items per page (default `20`, max `100`) |

**Response:**
```json
{
  "items": [ ...itemObjects ],
  "total": 42,
  "page": 1,
  "pages": 3
}
```
> Note: pagination uses `pages` (total page count), not `totalPages`.

---

### `GET /api/items/saved`
Returns the borrower's saved/wishlisted items, with live item data populated.

**Response:** Array of SavedItem objects:
```json
[
  {
    "_id": "savedItemId",
    "borrowerId": "userId",
    "outfitId": {
      "_id": "itemId",
      "images": ["https://..."],
      "category": "Formal",
      "size": "M",
      "interviewType": "Tech",
      "status": "Available",
      "lenderId": "userId"
    },
    "createdAt": "..."
  }
]
```

---

### `POST /api/items/:id/save`
Saves an item to the borrower's wishlist.

**Response:** The created SavedItem document (201).
Returns 400 if the item is already saved.

---

### `DELETE /api/items/:id/save`
Removes an item from the borrower's wishlist.

**Response:** `{ "message": "Unsaved." }`
Returns 404 if the saved item is not found.

---

## Lender Routes (require JWT + profile complete + activeRole = lender)

### `GET /api/items/my`
Returns all items listed by the currently authenticated lender, sorted newest first.

**Response:** Array of Item objects.

---

### `POST /api/items`
Creates a new item listing. Accepts `multipart/form-data` (for image uploads).

**Form fields:**

| Field | Required | Description |
|---|---|---|
| `category` | Yes | `Formal` \| `Semi-formal` \| `Business Casual` |
| `size` | Yes | Free text (e.g. `M`, `32W`) |
| `interviewType` | Yes | `Tech` \| `Corporate` \| `Finance` \| `General` \| `Other` |
| `measurements` | No | JSON string: `{"chest":"38","waist":"32","hips":"","length":"","shoulders":""}` |
| `fitDescription` | No | Free text |
| `fabricType` | No | Free text |
| `confidenceNote` | No | Why the lender recommends this outfit |
| `images` | No | Up to 5 image files (field name: `images`) |

Images are uploaded to Cloudinary under the `mint-narcissus/items` folder and stored as URLs.

**Response:** The created Item document (201).

---

### `PATCH /api/items/:id`
Updates an existing item listing. Same `multipart/form-data` format as POST.
Only the owner (by `lenderId`) can update. If new images are uploaded they **replace** the existing ones.

**Response:** The updated Item document.

---

### `PATCH /api/items/:id/status`
Lender manually toggles an item between `Available` and `Unavailable`.
Cannot be used on a `Borrowed` item (system-controlled).

**Body:**
```json
{ "status": "Unavailable" }
```

**Response:** The updated Item document.

---

### `DELETE /api/items/:id`
Deletes an item listing. Returns 400 if the item is currently `Borrowed`.

**Response:** `{ "message": "Item deleted." }`

---

## Internal Route (service-to-service only)

Not exposed through the gateway. Called directly by messaging-service using a shared secret.

**Auth:** `x-internal-secret` header must match the `INTERNAL_SECRET` env var.

### `PATCH /api/internal/items/:id/status`
Updates item status as part of the borrow lifecycle. The only way to set `Borrowed`.

**Body:**
```json
{ "status": "Borrowed" }
```
or
```json
{ "status": "Available" }
```

**When it's called:**
- Borrower accepts the lend agreement → messaging-service sets status to `Borrowed`
- Lender marks item as returned → messaging-service sets status back to `Available`

---

## Data Model — Item

```json
{
  "_id": "ObjectId",
  "lenderId": "ObjectId",
  "images": ["https://res.cloudinary.com/..."],
  "category": "Formal | Semi-formal | Business Casual",
  "size": "M",
  "measurements": {
    "chest": "38",
    "waist": "32",
    "hips": "",
    "length": "",
    "shoulders": ""
  },
  "fitDescription": "Slim fit",
  "fabricType": "Wool",
  "interviewType": "Tech | Corporate | Finance | General | Other",
  "confidenceNote": "Wore this to my Google interview",
  "status": "Available | Borrowed | Unavailable",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

**Status values:**

| Status | Set by | Meaning |
|---|---|---|
| `Available` | Default / lender / messaging-service | Visible in browse feed, can be requested |
| `Borrowed` | messaging-service only (internal route) | Hidden from feed, cannot be edited or deleted |
| `Unavailable` | Lender manually | Hidden from feed, lender can re-enable |

---

## Environment Variables

See `.env.example` for the full list. Key vars:

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | Shared MongoDB connection string |
| `JWT_SECRET` | Must match auth-service's secret |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account for image uploads |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `INTERNAL_SECRET` | Shared secret for service-to-service calls — must match messaging-service |
| `CLIENT_URL` | Allowed CORS origin (e.g. `http://localhost:5173`) |

---

## Lender Flow

```
Register / Login
    → Set activeRole = "lender" in Profile Setup
    → POST /api/items           — list a new outfit
    → GET  /api/items/my        — view own listings
    → PATCH /api/items/:id      — edit details or swap images
    → PATCH /api/items/:id/status — toggle Available / Unavailable
    → DELETE /api/items/:id     — remove listing (blocked if Borrowed)
```

When a borrower's request is approved and they accept the agreement, messaging-service calls the internal route to flip the item to `Borrowed`. Once the lender marks it returned, messaging-service flips it back to `Available`.

---

## Borrower Flow

```
Register / Login
    → Set activeRole = "borrower" in Profile Setup
    → GET  /api/items                      — browse available outfits (with filters)
    → GET  /api/items/:id                  — view outfit detail
    → POST /api/items/:id/save             — wishlist an outfit
    → GET  /api/items/saved                — view wishlist
    → DELETE /api/items/:id/save           — remove from wishlist
    → (borrow request is handled by messaging-service, not items-service)
```

---

## Notes for Gateway / Frontend Integration

- The `/api/items/saved` and `/:id/save` routes are registered **before** the `/:id` dynamic route to avoid route shadowing. Keep this ordering if a gateway rewrites paths.
- All image uploads must be sent as `multipart/form-data` with the field name `images`. JSON `Content-Type` will not work for create/update.
- The `measurements` field must be sent as a **JSON string** when using `multipart/form-data` (e.g. `JSON.stringify(obj)`), as multipart bodies are all strings.
- The internal route (`/api/internal/...`) should **not** be exposed through the API gateway — it is for messaging-service → items-service communication only.
