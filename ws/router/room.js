import { v4 as uuidv4 } from 'uuid';

class Room {
  constructor(isPriv = false, roomName) {
    (this.isPriv = isPriv),
      (this.roomName = roomName),
      (this.id = uuidv4()),
      this.chatters,
      this.createdAt,
      this.createdBy,
      this.host;
  }

  get isPriv() {
    return this.isPriv;
  }

  get roomName() {
    return this.roomName;
  }

  get id() {
    return this.id;
  }

  get chatters() {
    return this.chatters;
  }

  get createdAt() {
    return this.createdAt;
  }

  get createdBy() {
    return this.createdBy;
  }

  get host() {
    return this.host;
  }
}

export default Room;
