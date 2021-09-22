import { userStore, settingsStore } from './customers';

const configuredCustomers = [
  {
    user: {
      store: userStore,
      config: {
        persist: { on: false },
        devtools: true,
      },
    },
  },
  {
    setting: {
      store: settingsStore,
      config: {
        persist: { on: true, name: 'user_settings' },
        devtools: true,
      },
    },
  },
];

export default configuredCustomers;
