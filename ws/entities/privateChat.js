//peer to peer (only 2 people)

const privateChat = (socket, type) => {
  const joinRoom = () => {
    let split = socket.handshake.query.roomName.split('--with--'); // ['username2', 'username1']

    let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1)); // ['username1', 'username2']

    let updatedRoomName = `${unique[0]}--with--${unique[1]}`; // 'username1--with--username2'

    Array.from(socket.rooms)
      .filter(it => it !== socket.id)
      .forEach(id => {
        socket.leave(id);
        socket.removeAllListeners(`emitMessage`);
      });

    socket.join(updatedRoomName);
  };

  const emitMessage = message => {
    Array.from(socket.rooms)
      .filter(it => it !== socket.id)
      .forEach(id => {
        socket.to(id).emit('onMessage', message);
      });
  };

  const disconnect = () => {
    console.log(socket.id + ' ==== diconnected');
    socket.removeAllListeners();
  };

  socket.on('privateChat:joinRoom', joinRoom);
  socket.on('privateChat:emitMessage', emitMessage);
  socket.on('privateChat:disconnect', disconnect);
};

export default privateChat;
