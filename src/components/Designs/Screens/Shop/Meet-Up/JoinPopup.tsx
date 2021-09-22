import React, { useState, useEffect } from 'react';
import SchemedButton from '../../UI/schemeSwitch';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ClickAwayListener } from '@material-ui/core';
import useRoom from './hooks/useRoom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ValidationSchema = Yup.object().shape({
  roomId: Yup.boolean(),
  roomUrl: Yup.string().min(6, 'Too Short!').max(12, 'Too Long!'),
});

const JoinRoom = ({ history }) => {
  const [open, setOpen] = useState(false);
  const rooms = useRoom();

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  let room;

  useEffect(() => {
    setOpen(true);
  }, [room]);

  //to cache the roomId or roomUrl so it doesn't do a search
  //while they didn't change
  //and to make these values global for this function.
  let roomId;
  let roomUrl;

  const joinRoom = () => {
    history.push(`/room/${roomUrl}`);
  };

  return (
    <div>
      <h1>Join Room</h1>
      <Formik
        initialValues={{ roomId: '', roomUrl: '' }}
        ValidationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (values.roomUrl || values.roomId) {
            if (values.roomUrl !== roomUrl || values.roomId !== roomId) {
              room = rooms.filter(room => room.id === values.roomId);
              roomUrl = values.roomUrl;
              roomId = values.roomId;
              setSubmitting(false);
            }
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="roomId" name="roomId" />
            <ErrorMessage name="roomId" component="div" />
            <p>OR</p>
            {/* add "or" functionality */}
            <Field type="roomUrl" name="roomUrl" />
            <ErrorMessage name="roomUrl" component="div" />
            <SchemedButton
              type="submit"
              disabled={isSubmitting}
              onClick={handleClose}
              size={'small'}
              isIconLeft={'true'}
              icon={MeetingRoomIcon}
              text={'Join'}
            />
          </Form>
        )}
      </Formik>
      <ClickAwayListener onClick={handleClickAway}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Join Meeting</DialogTitle>
          <DialogContent>
            <DialogContentText>{room.info}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <SchemedButton onClick={joinRoom} />
          </DialogActions>
        </Dialog>
      </ClickAwayListener>
    </div>
  );
};

export default JoinRoom;
