# Messaging Service

**Port:** `3004` | **Base path:** `/api/messages`

Handles borrow requests, conversations, real-time messaging (Socket.io), and online presence.

---

## Setup

```bash
cd Backend/services/messaging-service
npm install
npm run dev
```

Loads env from `Backend/.env` — same file as auth-service.

---

## Environment Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Must match the value used by auth-service |
| `CLIENT_URL` | Frontend URL for CORS (default: `http://localhost:5173`) |

No extra variables beyond what auth-service already needs.

---

## How It Fits Together

The borrow flow is linear:

```
Borrower sends request → Lender approves → Conversation opens → They chat → Returned
```

1. Borrower calls `POST /api/messages/request` with an `outfitId`.
2. Lender approves via `PATCH /api/messages/requests/:id/approve` — this creates a Conversation automatically.
3. Both parties can now send messages in that conversation.
4. Once the outfit is returned, the conversation is marked inactive and no new messages can be sent.

---

## Borrow Request Endpoints

| Method | Path | Who | Description |
|---|---|---|---|
| `POST` | `/api/messages/request` | Borrower | Create a borrow request for an outfit |
| `GET` | `/api/messages/requests/incoming` | Lender | View incoming requests for your outfits |
| `GET` | `/api/messages/requests/my-requests` | Borrower | View your outgoing requests |
| `GET` | `/api/messages/requests/:id` | Both | View a single request (participants only) |
| `PATCH` | `/api/messages/requests/:id/approve` | Lender | Approve a pending request (opens conversation) |
| `PATCH` | `/api/messages/requests/:id/reject` | Lender | Reject a pending request |
| `PATCH` | `/api/messages/requests/:id/cancel` | Borrower | Cancel your own pending request |

List endpoints (`incoming`, `my-requests`) support `?status=` and `?page=` / `?limit=` query params.

**Borrow request statuses:** `pending` → `approved` / `rejected` / `cancelled` → `borrowed` → `returned` → `rated`

---

## Conversation & Message Endpoints

All require auth. Only conversation participants can access their own conversations.

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/messages/conversations` | List all your conversations (sorted by latest activity) |
| `GET` | `/api/messages/conversations/:id` | Get conversation details + paginated message history |
| `POST` | `/api/messages/conversations/:id` | Send a message (`{ "text": "..." }` in body) |
| `PATCH` | `/api/messages/conversations/:id/read` | Mark conversation as read (resets unread count) |

`GET /conversations/:id` accepts `?page=` and `?limit=` (max 100 per page, default 30).

---

## Real-time — Socket.io

The service runs a Socket.io server on the same port (`3004`). Authentication uses the `token` cookie automatically — no extra setup needed if the user is logged in.

**Connecting from the frontend:**

```js
import { io } from "socket.io-client";

const socket = io("http://localhost:3004", { withCredentials: true });
```

### Events to emit (client → server)

| Event | Payload | When to emit |
|---|---|---|
| `join_conversation` | `conversationId` (string) | When user opens a chat |
| `leave_conversation` | `conversationId` (string) | When user navigates away from chat |

### Events to listen for (server → client)

| Event | Payload | Description |
|---|---|---|
| `new_message` | Message object | A new message was sent in the conversation |
| `user_online` | `{ userId }` | Another participant opened the chat |
| `user_offline` | `{ userId }` | A participant left or disconnected |

**Example:**

```js
socket.emit("join_conversation", conversationId);

socket.on("new_message", (message) => {
  // append message to UI
});

socket.on("user_online", ({ userId }) => {
  // show online indicator
});
```

> Sending a message via `POST /api/messages/conversations/:id` automatically emits `new_message` to the room — you do not need to emit it from the client.

---

## Auth

The service has its own `src/middleware/auth.js` that reads the same `token` cookie as auth-service. It only attaches `req.user._id` (not the full user object). If you need more user fields inside a route handler, query MongoDB directly.
