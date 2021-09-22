import axios from 'axios';

const userStore = set => ({
  users: [],
  getUsers: async () => {
    const { data } = await axios.get('http://localhost:3050/api/user');
    set({ user: data });
  },
  addUser: user => set(state => ({ user: [...state.user, user] })),
});

export default userStore;
