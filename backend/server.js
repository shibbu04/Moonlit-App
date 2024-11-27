const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Create Express app
const app = express();
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store connected users
const users = new Set();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle user join
  socket.on('user_join', (username) => {
    // Check if username is unique
    if (!users.has(username)) {
      users.add(username);
      socket.username = username;

      // Broadcast user joined message
      io.emit('user_update', {
        username: username,
        action: 'join',
        users: Array.from(users)
      });
    } else {
      socket.emit('username_error', 'Username already exists');
    }
  });

  // Handle user manually leaving room
  socket.on('leave_room', (username) => {
    if (users.has(username)) {
      users.delete(username);
      
      // Broadcast user left message
      io.emit('user_update', {
        username: username,
        action: 'leave',
        users: Array.from(users)
      });
    }
  });

  // Handle chat message
  socket.on('send_message', (messageData) => {
    // Broadcast message to all clients except sender
    socket.broadcast.emit('receive_message', messageData);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    if (socket.username) {
      users.delete(socket.username);

      // Broadcast user left message
      io.emit('user_update', {
        username: socket.username,
        action: 'leave',
        users: Array.from(users)
      });
    }
    console.log('Client disconnected');
  });
});

// Simple health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Get port from environment or default
const PORT = process.env.PORT || 5000;

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;