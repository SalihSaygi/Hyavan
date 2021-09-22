import React from 'react';
const {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ExpandMoreIcon,
} = '@material-ui/core';

const RoomBar = ({ room }) => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="room-name">{room.name}</Typography>
          <Typography className="room-createdBy">{room.createdBy}</Typography>
          <Typography className="room-isVerified">{room.isVerified}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{room.details}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default RoomBar;
