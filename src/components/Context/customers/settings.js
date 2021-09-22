const settingsStore = set => ({
  dark: false,
  toggleDarkMode: () => set(state => ({ dark: !state.dark })),
});

export default settingsStore;
