// server.js
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Store users in an object
let users = {};

// Set up Express to serve static files
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
  console.log('New connection');

  // Handle new user
  socket.on('newUser', (username) => {
    users[username] = socket.id;
    socket.broadcast.emit('newUser', username);
    io.emit('updateBuddyList', Object.keys(users));
    io.emit('updateBuddyCount', Object.keys(users).length);
  });

  // Handle message
  socket.on('message', (message) => {
    socket.broadcast.emit('message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
    for (let username in users) {
      if (users[username] === socket.id) {
        delete users[username];
        io.emit('updateBuddyList', Object.keys(users));
        io.emit('updateBuddyCount', Object.keys(users).length);
        break;
      }
    }
  });
});

// Start server
server.listen(3000, () => {
  console.log('Server started on port 3000');
});
