const tag = (input, tags) => {
  let entity;
  const startsWith = input.charAt(0);
  tags.flatMap(tag => {
    if (tag.letter === startsWith) {
      entity = tag.entity;
      return entity;
    } else {
      return [];
    }
  });
};

export { tag };
