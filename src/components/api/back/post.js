import axi from './axios';

async function getPosts(id) {
  try {
    const { data } = await axi.get(`/api/users/${id}/posts`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getUserPosts(id) {
  try {
    const { data } = await axi.get(`/api/users/${id}/posts`);
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function getProfilePosts() {
  try {
    const { data } = await axi.get('/api/users/profile/posts');
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function getUserPost(userId, botId) {
  try {
    const { data } = await axi.get(`/api/users/${userId}/bots/${botId}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getProfilePost(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function createPost(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export {
  createPost,
  getPosts,
  getProfilePost,
  getProfilePosts,
  getUserPost,
  getUserPosts,
};
