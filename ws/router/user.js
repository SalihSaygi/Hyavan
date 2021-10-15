class User {
  constructor(userId) {
    (this.sockets = []), this.lastSeen, (this.userId = userId), this.friends;
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

  get friends() {
    return this.friends;
  }
}

export default User;
