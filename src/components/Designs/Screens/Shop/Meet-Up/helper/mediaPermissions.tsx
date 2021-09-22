const mediaPermissions = () => {
  let micPerm;
  let camPerm;

  navigator.permissions
    .query({ name: 'microphone' })
    .then(permission => {
      micPerm = permission.state;
    })
    .catch(error => {
      console.log('Got error :', error);
      throw new Error(error);
    });

  navigator.permissions
    .query({ name: 'camera' })
    .then(permission => {
      camPerm = permission.state;
    })
    .catch(error => {
      console.log('Got error :', error);
    });

  return { micPerm, camPerm };
};

export default mediaPermissions;
