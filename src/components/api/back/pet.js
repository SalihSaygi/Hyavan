import axi from './axios';

async function getPublicReports(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getUserPublicReports(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getUserPublicReport(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getProfilePublicReports(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getProfilePublicReport(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function createPublicReport(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getPrivateReports(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getUserPrivateReports(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getUserPrivateReport(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getProfilePrivateReports(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getProfilePrivateReport(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function createPrivateReport(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function updatePrivateReport(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getLostPets(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getUserLostPets(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getUserLostPet(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getProfileLostPets(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getProfileLostPet(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function createLostPet(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function updateLostPet(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export {
  createLostPet,
  createPrivateReport,
  createPublicReport,
  getProfileLostPet,
  getProfileLostPets,
  getProfilePrivateReport,
  getUserLostPet,
  getProfilePublicReport,
  getProfilePrivateReports,
  updateLostPet,
  getUserPrivateReports,
  getPublicReports,
  getUserPublicReports,
  getUserPublicReport,
  getUserLostPets,
  getProfilePublicReports,
  updatePrivateReport,
  getLostPets,
  getUserPrivateReport,
  getPrivateReports,
};
