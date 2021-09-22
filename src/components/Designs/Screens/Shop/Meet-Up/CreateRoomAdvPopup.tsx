import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateRoom from './CreateRoomAdvForm';
import SchemedButton from './UI/SchemeSwitch';
import { ClickAwayListener } from '@material-ui/core';

export default function CreateRoomPopup() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(prev => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div>
      <SchemedButton
        onClick={handleClickOpen}
        text={'Create Room | Advanced'}
      />
      <ClickAwayListener onClick={handleClickAway}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Advanced</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill in the spaces as you'd like.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <CreateRoom handleClose={handleClose} />
          </DialogActions>
        </Dialog>
      </ClickAwayListener>
    </div>
  );
}
