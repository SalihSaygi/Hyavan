import axi from './axios';

async function getRooms(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getCurrentRoom(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function createRooms(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export { createRooms, getCurrentRoom, getRooms };
