import React from 'react';
import { v1 as uuid } from 'uuid';
import SchemedButton from '../../UI/schemeSwitch';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const CreateRoom = ({ history, scheme }) => {
  function create() {
    const id = uuid();
    history.push(`/room/${id}`);
  }

  return (
    <SchemedButton
      onClick={create}
      size={'small'}
      scheme={scheme.scheme}
      isIconLeft={scheme.icon}
      icon={MeetingRoomIcon}
      text={'Create Room'}
    />
  );
};

export default CreateRoom;
