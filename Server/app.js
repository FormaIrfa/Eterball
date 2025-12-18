const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const cors = require('cors');
dotenv.config();
const usersRoutes = require('./routes/signup.js');
const loginRoutes = require('./routes/login.js');
const shopRoutes = require('./routes/shop');

const PORT = process.env.PORT;
const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:5000', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const connectedUsers = [];

app.use(express.json());
app.use(morgan('combined'));
app.use(cors());
app.use('/shop', shopRoutes);
// Middleware pour servir les fichiers du dossier "public"
app.use('/static', express.static('public'));

// Connexion à MongoDB

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connecté à MongoDB');
  })
  .catch((err) => {
    console.error('Erreur de connexion a MongoDB:', err);
  });

app.use('/', usersRoutes);
app.use('/', loginRoutes);

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
    next(new Error('Token invalide'));
  }
});

io.on('connection', (socket) => {
  const username = socket.user.username;
  console.log(`${username} est connecté`);

  connectedUsers.push({ socketId: socket.id, username });

  io.emit(
    'connectedUsers',
    connectedUsers.map((u) => u.username)
  );

  socket.on('newMessage', (messageContent) => {
    io.emit('message', messageContent);
  });

  socket.on('privateMSg', (targetUsername, messageContent) => {
    const target = connectedUsers.find((u) => u.username === targetUsername);
    if (target) {
      io.to(target.socketId).emit('privateMsg', {
        sender: username,
        content: messageContent,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log(`${username} est déconnecté`);
    const index = connectedUsers.findIndex((u) => u.socketId === socket.id);
    if (index !== -1) connectedUsers.splice(index, 1);

    io.emit(
      'connectedUsers',
      connectedUsers.map((u) => u.username)
    );
  });
});

server.listen(PORT, () => {
  console.log(`Serveur est démarré sur le port ${PORT}`);
});
