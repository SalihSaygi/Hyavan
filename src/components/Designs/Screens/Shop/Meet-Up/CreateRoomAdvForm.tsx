import React from 'react';
import SchemedButton from '../../UI/schemeSwitch';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ValidationSchema = Yup.object().shape({
  isPublic: Yup.boolean().required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(12, 'Too Long!'),
  roomName: Yup.string()
    .matches(/[^A-Za-z0-9]+/)
    .required('Required'),
});

const CreateRoom = ({ history, scheme, handleClose }) => {
  return (
    <div>
      <h1>Create Your Room</h1>
      <Formik
        initialValues={{ ispublic: true, password: '', roomName: '' }}
        ValidationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post('localhost:3050/api/room', values)
            .then(function (response) {
              console.log(response, 'roomPost');
              history.push(`/room/${values.roomName}`);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="isPublic" name="isPublic" />
            <ErrorMessage name="isPublic" component="div" />
            <Field type="password" name="password" />\{' '}
            <ErrorMessage name="password" component="div" />
            <Field type="roomName" name="roomName" />
            <ErrorMessage name="roomName" component="div" />
            <SchemedButton
              type="submit"
              disabled={isSubmitting}
              onClick={handleClose}
              size={'small'}
              scheme={scheme.scheme}
              isIconLeft={scheme.isIcon}
              icon={MeetingRoomIcon}
              text={'Create Room'}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateRoom;
