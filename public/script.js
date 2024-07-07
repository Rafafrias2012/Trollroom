// script.js
$(document).ready(() => {
  const socket = io();
  let username;

  // Handle join button click
  $('#join-btn').click(() => {
    username = $('#username').val();
    socket.emit('newUser', username);
    $('#username').prop('disabled', true);
    $('#join-btn').prop('disabled', true);
  });

  // Handle send button click
  $('#send-btn').click(() => {
    const message = $('#message').val();
    socket.emit('message', message);
    $('#message').val('');
  });

  // Handle new user
  socket.on('newUser', (username) => {
    $('#buddy-list').append(`<li>${username}</li>`);
  });

  // Handle update buddy list
  socket.on('updateBuddyList', (users) => {
    $('#buddy-list').empty();
    users.forEach((user) => {
      $('#buddy-list').append(`<li>${user}</li>`);
    });
  });

  // Handle update buddy count
  socket.on('updateBuddyCount', (count) => {
    $('#buddy-count').text(`${count} buddies online`);
  });

  // Handle message
  socket.on('message', (message) => {
    $('#chat-log').append(`<p>${message}</p>`);
  });
});
