import { useState, useEffect } from 'react';
import useSocket from '../../../../../hooks/useSocket';

const useStatus = () => {
  const [onlineFriends, setOnlineFriends] = useState([]);

  const { socketRef } = useSocket();

  useEffect(() => {
    socketRef.current.emit('status', socketRef.current.status);
  }, [socketRef.current.status]);

  useEffect(() => {
    const interval = setInterval(() => {
      socketRef.current.on('all users', users => {
        if (users && users.length === 1) {
          setOnlineFriends(
            onlineFriends.filter(friend => friend.status === 'online')
          );
        }
      });
    }, 15000);
    return () => clearInterval(interval);
  }, [socketRef.current]);
};

export default useStatus;
