import axi from './axios';

async function getUsers() {
  try {
    const { data } = await axi.get('/api/users');
    return data.data;
  } catch (err) {
    console.error(err);
  }
}

async function getUser(queryKey) {
  const [{ id }] = queryKey;
  try {
    const { data } = await axi.get(`/api/users/${id}`);
    return data.data;
  } catch (err) {
    console.error(err);
  }
}

async function getProfile() {
  try {
    const { data } = await axi.get('/api/users/profile');
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function postProfilePromoToken(accessToken, refreshToken) {
  try {
    const { status } = await axi.put(
      '/api/users/profile',
      accessToken,
      refreshToken
    );
    return status;
  } catch (err) {
    console.error(err);
  }
}
async function getUserAccount(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getProfileAccount(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function updateAccount(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export {
  getProfile,
  updateAccount,
  getUser,
  getUsers,
  getProfileAccount,
  getUserAccount,
  postProfilePromoToken,
};
