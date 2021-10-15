import Chatter from './chatter';
import { v4 as uuidv4 } from 'uuid';

class Lounge {
  constructor(userId) {
    this.users, this.createdAt, (this.createdBy = userId), (this.host = userId);
    this.id = uuidv4();
  }

  get users() {
    return this.users;
  }

  get metadata() {
    const meta = { createdAt: this.createdAt, createdBy: this.createdBy };
    return meta;
  }
}

export default Lounge;
