import Chatter from './chatter';
import { v4 as uuidv4 } from 'uuid';

class Lounge {
  constructor(userId) {
    this.chatters,
      this.createdAt,
      (this.createdBy = userId),
      (this.host = userId);
    this.id = uuidv4();
  }

  get chatters() {
    return this.chatters;
  }

  get metadata() {
    const meta = { createdAt: this.createdAt, createdBy: this.createdBy };
    return meta;
  }
}

export default Lounge;
