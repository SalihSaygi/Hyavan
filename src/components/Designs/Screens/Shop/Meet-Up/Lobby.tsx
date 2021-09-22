import React, { useState } from 'react';

import RoomBar from './RoomBar';
import UserBar from './UserBar';

import {
  AppBar,
  Tabs,
  Tab,
  
} from '@material-ui/core';

import TabPanel from './UI/TabPanel';

import { useRoom } from './Context/Room';
import { useUser } from './Context/User';

const Lobby = () => {
  const rooms = useRoom();
  const { friends, speakers } = useUser();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="lobby">
      <div className="tabs">
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="tabs">
            <Tab
              label="friends"
              className="friends"
              id="simple-tab-0"
              aria-controls="simpla-tabpanel-0"
            />
            <Tab
              label="friends"
              className="followed-speakers"
              id="simple-tab-1"
              aria-controls="simpla-tabpanel-1"
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {friends.map((index, friend) => (
            <div key={index}>
              <UserBar user={friend} />
            </div>
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {speakers.map((index, speaker) => (
            <div key={index}>
              <UserBar user={speaker} />
            </div>
          ))}
        </TabPanel>
      </div>
      <div className="rooms">
        {rooms.map((index, room) => (
          <div key={index}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="heading">{room.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{room.details}</Typography>
              </AccordionDetails>
            </Accordion>
            <RoomBar room={room} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lobby;
