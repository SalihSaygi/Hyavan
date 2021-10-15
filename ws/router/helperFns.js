function multipleEnds(ends, lounges) {
  let command = [];
  ends.forEach(end => {
    if (lounges.includes(end)) {
      command.push(`.to(${end})`);
    }
    throw new Error('No end found', end);
  });
  return command.join('');
}

function nameGenerator() {
  let split = socket.handshake.query.roomName.split('--with--'); // ['username2', 'username1']

  let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1)); // ['username1', 'username2']

  let updatedRoomName = `${unique[0]}--with--${unique[1]}`; // 'username1--with--username2'

  return updatedRoomName;
}

export { multipleEnds, nameGenerator };
