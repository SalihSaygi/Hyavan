import useLocalStorage from './useLocalStorage';

const useMedia = () => {
  const [isMicOpen, setIsMicOpen] = useLocalStorage('media-mic', false);
  const [isCameraOpen, setIsCameraOpen] = useLocalStorage(
    'media-camera',
    false
  );

  return { isCameraOpen, setIsCameraOpen, setIsMicOpen, isMicOpen };
};

export default useMedia;
