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
const path = require("path");

/* ========================
   APP INIT
======================== */
const app = express();

/* ========================
   CORS (FIXED)
======================== */
const allowedOrigins = [
  "http://localhost:5173",
  "https://kanuorie-tech-lib-ne15.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked CORS:", origin);
        callback(null, false);
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend/dist")));

/* ========================
   ROUTES (IMPORTANT)
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

/* ========================
   SOCKET.IO
======================== */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
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
   DEBUG 404 (FIXED)
======================== */
app.use((req, res) => {
  console.log("⚠️ Route not found:", req.method, req.originalUrl);

  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
  });
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