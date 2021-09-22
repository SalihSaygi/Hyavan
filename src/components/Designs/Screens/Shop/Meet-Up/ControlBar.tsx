import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import SchemedButton from '../../UI/schemeSwitch';
import useSocket from './hooks/useSocket';
import useMedia from './hooks/useMedia';
import usePreference from './hooks/usePreference';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import ConfirmLeave from './ConfirmLeave';
import InvitePopup from './InvitePopup';

const ControlBar = ({ scheme }) => {
  const { isCameraOpen, isMicOpen, setIsCameraOpen, setIsMicOpen } = useMedia();
  const { isChatOpen, setIsChatOpen } = usePreference;
  const { myStream, socketRef } = useSocket;
  const [isDisabledAll, setIsDisabledAll] = useState(
    !socketRef.current.connected
  );

  useEffect(() => {
    setIsDisabledAll(prev => !prev);
  }, [socketRef.current.connected]);

  useEffect(() => {
    myStream.current.getAudioTracks()[0].enabled = isMicOpen;
  }, [isMicOpen, myStream]);

  useEffect(() => {
    myStream.current.getVideoTracks()[0].enabled = isCameraOpen;
  }, [isCameraOpen, myStream]);

  useHotkeys('alt+m', () => setIsMicOpen(!isMicOpen));
  useHotkeys('alt+n', () => setIsCameraOpen(!isCameraOpen));
  useHotkeys('alt+c', () => setIsChatOpen(!isChatOpen));

  return (
    <div className={scheme}>
      <SchemedButton
        className="microphone"
        onClick={setIsMicOpen(!isMicOpen)}
        disabled={isDisabledAll}
      >
        {isMicOpen ? <MicIcon /> : <MicOffIcon />}
      </SchemedButton>
      <SchemedButton
        className="camera"
        onClick={setIsCameraOpen(!isCameraOpen)}
        disabled={isDisabledAll}
      >
        {isCameraOpen ? <VideocamIcon /> : <VideocamOffIcon />}
      </SchemedButton>
      <SchemedButton
        className="chat"
        onClick={setIsChatOpen(!isChatOpen)}
        disabled={isDisabledAll}
      >
        {isChatOpen ? <SpeakerNotesIcon /> : <SpeakerNotesOffIcon />}
      </SchemedButton>
      <InvitePopup disabled={isDisabledAll} />
      <ConfirmLeave disabled={isDisabledAll} />
    </div>
  );
};

export default ControlBar;
