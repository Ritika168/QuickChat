import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import connectDB from "./lib/db.js";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js";
import { Server } from "socket.io";

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app); // socket.io needs raw http server

// Middleware Setup
app.use(express.json({ limit: "4mb" }));
app.use(cookieParser()); // ✅ Parse cookies from incoming requests

app.use(cors({
  origin: "http://localhost:5173", // ✅ Frontend origin (Vite default)
  credentials: true               // ✅ Allow cookies
}));

// Init socket.io with CORS config
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

// Store online users
export const userSocketMap = {}; // { userId: socketId }

// Socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Emit list of online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Routes
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Connect to MongoDB
await connectDB();

// Start server
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5001;
  server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
}

// Export for serverless platforms like Vercel
export default server;
