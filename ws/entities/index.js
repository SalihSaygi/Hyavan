import groupChat from './groupChat';
import privateChat from './privateChat';
import announcement from './announcement';
import rtc from './conference';
//WebRtc is an object { mediasoupRouter, createTransport, createConsumer, config }

const entities = (socket, WebRtc) => {
  announcement(socket);
  groupChat(socket);
  privateChat(socket);
  rtc(
    socket,
    WebRtc.mediasoupRouter,
    WebRtc.createTransport,
    WebRtc.createConsumer,
    WebRtc.config
  );
};

export default entities;
