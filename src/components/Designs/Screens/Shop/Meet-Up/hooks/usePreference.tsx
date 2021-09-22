/* eslint-disable react-hooks/exhaustive-deps */
import useLocalStorage from './useLocalStorage';

const usePreference = () => {
  const [scheme, setScheme] = useLocalStorage('scheme', 'default');
  const [isChatOpen, setIsChatOpen] = useLocalStorage('media-chat', false);

  return { isChatOpen, setIsChatOpen, scheme, setScheme };
};

export default usePreference;
