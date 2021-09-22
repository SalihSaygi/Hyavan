import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CreateRoom from './routes/CreateRoom';
import Room from './routes/Room';
import Lobby from './Lobby';

import { RoomProvider } from './Context/Room';
import { CircleLoader } from './feedback/PageLoader';
import { SnackBar } from './feedback/SnackBar';
import { useQuery } from 'react-query';
import { UserProvider } from './Context/User';

function MeetUp() {
  const rooms = useQuery('rooms');

  if (rooms.isLoading) {
    return <CircleLoader />;
  }
  if (rooms.isError) {
    return <SnackBar error={rooms.error} />;
  }

  const users = useQuery('users');

  if (users.isLoading) {
    return <CircleLoader />;
  }
  if (users.isError) {
    return <SnackBar error={users.error} />;
  }
  return (
    <div>
      <UserProvider users={users.data}>
        <RoomProvider rooms={rooms.data}>
          <BrowserRouter>
            <Switch>
              <Route path="/lobby" exact component={Lobby} />
              <Route path="/room/create" exact component={CreateRoom} />
              <Route path="/room/:roomID" component={Room} />
            </Switch>
          </BrowserRouter>
        </RoomProvider>
      </UserProvider>
    </div>
  );
}

export default MeetUp;
