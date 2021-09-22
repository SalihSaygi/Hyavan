import Peer from 'simple-peer';

function createPeer(socket, callerID, stream) {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream,
  });

  const userToSignal = socket.id;

  peer.on('signal', signal => {
    socket.emit('sending signal', {
      userToSignal,
      callerID,
      signal,
    });
  });

  return peer;
}

function addPeer(incomingSignal, callerID, stream, socketRef) {
  const peer = new Peer({
    initiator: false,
    trickle: false,
    stream,
  });

  peer.on('signal', signal => {
    socketRef.current.emit('returning signal', { signal, callerID });
  });

  peer.signal(incomingSignal);

  return peer;
}

export { createPeer, addPeer };
