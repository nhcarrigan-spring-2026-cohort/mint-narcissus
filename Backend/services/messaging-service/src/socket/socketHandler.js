const jwt = require("jsonwebtoken");
const cookie = require("cookie");

// In-memory map: conversationId -> Set of userIds currently in the room.
// Used to track and broadcast online/offline presence within a conversation.
const onlineUsers = new Map();

module.exports = (io) => {
  // Authenticate every incoming socket connection using the JWT cookie.
  // Unauthenticated connections are rejected before the 'connection' event fires.
  io.use((socket, next) => {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      return next(new Error("Not authenticated."));
    }

    const cookies = cookie.parse(cookieHeader);

    if (!cookies.token) {
      return next(new Error("Not authenticated."));
    }

    try {
      const decoded = jwt.verify(
        cookies.token,
        process.env.JWT_SECRET || "jwt_secret",
      );
      socket.userId = decoded.userId;
      next();
    } catch {
      next(new Error("Invalid token."));
    }
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: user ${socket.userId}`);

    // Client joins a conversation room when they open the chat view.
    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId);

      if (!onlineUsers.has(conversationId)) {
        onlineUsers.set(conversationId, new Set());
      }

      // Capture who is already online before adding the joining user
      const alreadyOnline = [...onlineUsers.get(conversationId)];

      onlineUsers.get(conversationId).add(socket.userId);

      // Notify others in the room that this user joined
      socket.to(conversationId).emit("user_online", { userId: socket.userId });

      // Tell the joining user about everyone already in the room
      alreadyOnline.forEach((userId) => {
        socket.emit("user_online", { userId });
      });
    });

    // Client leaves a conversation room when they navigate away from chat.
    socket.on("leave_conversation", (conversationId) => {
      socket.leave(conversationId);

      if (onlineUsers.has(conversationId)) {
        onlineUsers.get(conversationId).delete(socket.userId);
      }

      socket.to(conversationId).emit("user_offline", {
        userId: socket.userId,
      });
    });

    // Clean up presence from all rooms on disconnect (browser close, network drop, etc.)
    socket.on("disconnect", () => {
      onlineUsers.forEach((users, conversationId) => {
        if (users.has(socket.userId)) {
          users.delete(socket.userId);
          socket.to(conversationId).emit("user_offline", {
            userId: socket.userId,
          });
        }
      });

      console.log(`Socket disconnected: user ${socket.userId}`);
    });
  });
};
