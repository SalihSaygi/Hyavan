const announcement = (io, socket) => {
  const welcomePub = (username, callback) => {};

  const welcomePriv = (username, callback) => {};

  const userLeft = (username, callback) => {};

  const typing = (username, callback) => {};

  const message = (username, callback) => {
    const user = {
      username,
      id: socket.id,
    };

    socket.emit('send-message', {
      sender: user,
    });
  };

  const kick = (textId, callback) => {};

  const host = (textId, callback) => {};

  socket.on('welcomePub', welcomePub);
  socket.on('welcomePriv', welcomePriv);
  socket.on('userLeft', userLeft);
  socket.on('typing', typing);
  socket.on('message', message);
  socket.on('kick', kick);
  socket.on('host', host);
};

export default announcement;
