import User from './user.js';

class Chatter extends User {
  constructor() {
    (this.subscribedRooms = []), this.lastSeen;
  }

  get subscribedRooms() {
    return this.subscribedRooms;
  }
}

export default Chatter;
