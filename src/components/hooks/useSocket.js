import { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';
import videoConstraints from '../config/videoConstraints';
import { createPeer, addPeer } from '../functions/peer';
import useMedia from '../Designs/Screens/FindYourPet/hooks/useMedia';
import { mediaPermissions } from '../helper/tag';

const useSocket = roomId => {
  const [peers, setPeers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const socketRef = useRef();
  const streamRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const myStream = useRef();

  const { isMicOpen, isCameraOpen } = useMedia();
  const { micPerm, camPerm } = mediaPermissions();

  useEffect(() => {
    socketRef.current = io('/meet-up');
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then(stream => {
        if (micPerm && camPerm) {
          setErrorMessage(
            'Camera and microphone permissions are required to use this application.'
          );
        }
        streamRef.current = stream;
        myStream.current = streamRef.current;
      })
      .catch(err => {
        console.log(err);
        setErrorMessage(
          'An error has occured while trying to get stream from user media devices.'
        );
      });
  }, [micPerm, camPerm]);

  useEffect(() => {
    userVideo.current.srcObject = streamRef.current;
    streamRef.current.getAudioTracks()[0].enabled = isMicOpen;
    streamRef.current.getVideoTracks()[0].enabled = isCameraOpen;
  }, [isMicOpen, isCameraOpen]);

  useEffect(() => {
    socketRef.current.emit('join room', roomId);
    socketRef.current.on('all users', users => {
      const peers = [];
      users.forEach(userID => {
        const peer = createPeer(userID, socketRef.current, streamRef.current);
        peersRef.current.push({
          peerID: userID,
          peer,
        });
        peers.push(peer);
      });
      setPeers(peers);
    });

    socketRef.current.on('user joined', payload => {
      const peer = addPeer(
        payload.signal,
        payload.callerID,
        streamRef.current,
        socketRef
      );
      peersRef.current.push({
        peerID: payload.callerID,
        peer,
      });

      setPeers(users => [...users, peer]);
    });

    socketRef.current.on('receiving returned signal', payload => {
      const item = peersRef.current.find(p => p.peerID === payload.id);
      item.peer.signal(payload.signal);
    });
  });

  return { peers, socketRef, userVideo, peersRef, myStream, errorMessage };
};

export default useSocket;
