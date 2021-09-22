import { useState } from 'react';
import { useQuery } from 'react-query';

const useSearch = (queryFunction, entity) => {
  const [input, setInput] = useState('');
  const startsWith = input.startsWith('@');
  switch (startsWith) {
    case '@':
      entity = 'allUsers';
      break;
    case '#':
      entity = '';
      break;
    default:
      break;
  }
  const [dataListDefault, setDataListDefault] = useState();
  const [dataList, setDataList] = useState();
  const { isLoading, isError, data, error } = useQuery(
    `${entity}`,
    queryFunction
  );

  setDataList(data);
  setDataListDefault(data);

  const updateInput = input => {
    const filtered = dataListDefault.filter(data => {
      return data.name.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setDataList(filtered);
  };

  return { isLoading, isError, error, dataList, input, updateInput, entity };
};

export default useSearch;
