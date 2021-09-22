const Switcher = messageType => {
  switch (messageType) {
    case 'conference':
      return 'conference.*';
    case 'chat':
      return 'chat.*';
    case 'support':
      return 'support.*';
  }
};
