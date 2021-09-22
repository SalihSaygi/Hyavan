import { getUsers, getUserBots, getProfileBots, getRooms } from '@apiCalls';

const SearchParams = param => {
  let type;
  let queryFunction;

  switch (param) {
    case 'allUsers':
      type = users;
      queryFunction = getUsers;
      break;
    case 'allPetWalkerPosts':
      type = bots;
      queryFunctions = getUserBots;
      break;
    case 'allUsersLookingForPetWalker':
      type = bots;
      queryFunction = getProfileBots;
      break;
    case 'allPets':
      type = rooms;
      queryFunction = getRooms;
      break;
    case 'roomUsers':
      type = users;
      queryFunction = getRoomUsers;
      break;
    default:
      type = '';
      queryFunction = '';
      break;
  }

  return { type, queryFunction };
};

export default SearchParams;
