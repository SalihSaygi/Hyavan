class Chatter {
  constructor(userId) {
    (this.sockets = []), this.lastSeen, (this.userId = userId);
  }

  get sockets() {
    return this.sockets;
  }

  get lastSeen() {
    return this.lastSeen;
  }

  get userId() {
    return this.userId;
  }
}
