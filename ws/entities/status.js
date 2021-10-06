import mongoose from 'mongoose';

const status = (io, socket, type) => {
  const onlineFriends = {};
  const blockedUsers = {};
  const bannedUsers = {};

  const userId = socket.handshake.query.id;

  const active = () => {
    if (users[userId]) {
      if (users.length === 4) {
        socket.emit('room full');
        return;
      }
      users[userId].push(socket.id);
    } else {
      users[userId] = [socket.id];
    }
    socket.broadcast.to(onlineFriends);
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

    socket.emit('all users', usersInThisRoom);
  };

  const sendMessage = (recipients, payload) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient);
      newRecipients.push(userId);
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients,
        sender: socket.id,
        payload,
      });
    });
  };
  const sendSignal = payload => {
    io.to(payload.userToSignal).emit('user joined', {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  };
  const returnSignal = payload => {
    io.to(payload.callerID).emit('receiving returned signal', {
      signal: payload.signal,
      id: socket.id,
    });
  };

  const disconnect = () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter(id => id !== socket.id);
      users[roomID] = room;
    }
  };

  socket.on('groupChat:sendMessage', sendMessage);
  socket.on('groupChat:disconnect', disconnect);
  socket.on('groupChat:sending signal', sendSignal);
  socket.on('groupChat:returning signal', returnSignal);
  socket.on('groupChat:join room', joinRoom);
};

export default groupChat;
