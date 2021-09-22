import React, { useState } from 'react';

const RoomContext = React.createContext(null);

export const RoomProvider = ({ room, children }) => {
  const [currentRoom, setCurrentRoom] = useState(room);

  return (
    <RoomContext.Provider value={(currentRoom, setCurrentRoom)}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => React.useContext(RoomContext);
