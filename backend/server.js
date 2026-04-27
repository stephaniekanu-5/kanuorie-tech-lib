require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const { connectDB } = require("./config/db");

/* ========================
   ROUTES
======================== */
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const courseRoutes = require("./routes/courseRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const progressRoutes = require("./routes/progressRoutes");

/* ========================
   APP INIT
======================== */
const app = express();

/* ========================
   MIDDLEWARE
======================== */
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

app.use(express.json());

/* ========================
   ROUTES
======================== */
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/progress", progressRoutes);

/* ========================
   HEALTH CHECK
======================== */
app.get("/", (req, res) => {
  res.send("API running...");
});

/* ========================
   SERVER + SOCKET.IO
======================== */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("join", (userId) => {
    if (!userId) return;
    socket.join(`user_${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

/* ========================
   404 HANDLER
======================== */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ========================
   ERROR HANDLER
======================== */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

/* ========================
   START SERVER
======================== */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("📡 Database connected");

    const { sequelize } = require("./models");

    if (!sequelize) {
      throw new Error("Sequelize instance not found");
    }

    console.log("📦 Database synced successfully");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("💥 DB/Server Error:", error);
    process.exit(1);
  }
};

startServer();