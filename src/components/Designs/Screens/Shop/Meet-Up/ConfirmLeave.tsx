import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ClickAwayListener } from '@material-ui/core';
import SchemedButton from './UI/Button/SchemedButton';
import filterToOnline from './functions/status';
import useUser from './hooks/useUser';

export default function InvitePopup({ disabled }) {
  const [open, setOpen] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(disabled);

  const { friends } = useUser();

  const { onlineFriends } = filterToOnline(friends);

  const handleClickOpen = () => {
    setOpen(prev => !prev);
    setTimeout(() => {
      setIsDisabled(false);
    }, 1000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClick={handleClickAway}>
      <SchemedButton size="small" disabled={disabled} onClick={handleClickOpen}>
        Leave Room
      </SchemedButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Confirm Leave</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to leave?</DialogContentText>
        </DialogContent>
        <DialogActions>
          {onlineFriends.map(friend => {
            <SchemedButton
              text={friend.username}
              size="small"
              isIconLeft={true}
              disabled={isDisabled}
            />;
          })}
        </DialogActions>
      </Dialog>
    </ClickAwayListener>
  );
}
