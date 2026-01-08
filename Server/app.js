const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const cors = require("cors");
dotenv.config();
const usersRoutes = require("./routes/signup.js");
const loginRoutes = require("./routes/login.js");
const shopRoutes = require("./routes/shop");
const classesRoutes = require("./routes/classes");

const PORT = process.env.PORT || 5000;
const app = express();
const allowedOrigins = [
  process.env.CLIENT_URL, // https://eterball.vercel.app
  "http://localhost:3000",
  "http://localhost:5173",
].filter(Boolean);

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);

    // ✅ Refuse proprement (pas de 500)
    return cb(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const connectedUsers = [];

const verifyEmailRoutes = require("./routes/verifyEmail");
app.use("/", verifyEmailRoutes);

app.use(morgan("combined"));
app.use("/shop", shopRoutes);
app.use("/api", classesRoutes);

// Connexion à MongoDB
console.log("Tentative de connexion MongoDB...");
app.get("/health", (req, res) => res.status(200).send("ok"));

server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.error("Erreur MongoDB:", err));

app.use("/", usersRoutes);
app.use("/", loginRoutes);

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    socket.disconnect();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = payload;
    next();
  } catch (err) {
    next(new Error("Token invalide"));
  }
});

io.on("connection", (socket) => {
  const username = socket.user.username;
  console.log(`${username} est connecté`);

  connectedUsers.push({ socketId: socket.id, username });

  io.emit(
    "connectedUsers",
    connectedUsers.map((u) => u.username)
  );

  socket.on("newMessage", (messageContent) => {
    io.emit("message", messageContent);
  });

  socket.on("privateMSg", (targetUsername, messageContent) => {
    const target = connectedUsers.find((u) => u.username === targetUsername);
    if (target) {
      io.to(target.socketId).emit("privateMsg", {
        sender: username,
        content: messageContent,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log(`${username} est déconnecté`);
    const index = connectedUsers.findIndex((u) => u.socketId === socket.id);
    if (index !== -1) connectedUsers.splice(index, 1);

    io.emit(
      "connectedUsers",
      connectedUsers.map((u) => u.username)
    );
  });
});
