import React, { useState } from 'react';
import mediasoup from 'mediasoup-client';
import socketClient from 'socket.io-client';
import config from '../config/mediasoup';
import Video from './Video';

const socketPromise = require('./lib/socket.io-promise').promise;

const Conversation = () => {
  let device;
  let socket;
  // eslint-disable-next-line no-unused-vars
  let producer;

  window.localStorage.setItem('debug', 'mediasoup-client:*');

  const [isPublishFieldSetDisabled, setIsPublishFieldSetDisabled] = useState(
    true
  );
  const [
    isSubscribeFieldSetDisabled,
    setIsSubscribeFieldSetDisabled,
  ] = useState(true);

  const [isConnectButtonDisabled, setIsConnectButtonDisabled] = useState(false);
  const [isScreenButtonDisabled, setIsScreeButtonDisabled] = useState(true);

  const [connectionText, setConnectionText] = useState('');
  const [subscribeText, setSubscribeText] = useState('');
  const [publishText, setPublishText] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [webcamText, setWebcamText] = useState('');
  const [screenText, setScreenText] = useState('');
  const [isSimulcastChecked, setIsSimulcastChecked] = useState(false);

  if (typeof navigator.mediaDevices.getDisplayMedia === 'undefined') {
    setScreenText('Not supported');
    setIsScreeButtonDisabled(true);
  }

  const connectHandler = () => {
    setIsConnectButtonDisabled(true);
    setConnectionText('Connecting');

    const opts = {
      path: '/server',
      transports: ['websocket'],
    };

    const hostname = window.location.hostname;

    const serverUrl = `https://${hostname}:${config.listenPort}`;
    socket = socketClient(serverUrl, opts);
    socket.request = socketPromise(socket);

    socket.on('connect', async () => {
      setConnectionText('Connected');
      setIsPublishFieldSetDisabled(false);
      setIsSubscribeFieldSetDisabled(false);

      const data = await socket.request('getRouterRtpCapabilities');
      await loadDevice(data);
    });

    socket.on('disconnect', () => {
      setConnectionText('Disconnected');
      setIsConnectButtonDisabled(false);
      setIsPublishFieldSetDisabled(true);
      setIsSubscribeFieldSetDisabled(true);
    });

    socket.on('connect_error', error => {
      console.error(
        'could not connect to %s%s (%s)',
        serverUrl,
        opts.path,
        error.message
      );
      setConnectionText('Connection failed');
      setIsConnectButtonDisabled(false);
    });

    socket.on('newProducer', () => {
      setIsSubscribeFieldSetDisabled(false);
    });
  };

  const loadDevice = async routerRtpCapabilities => {
    try {
      device = new mediasoup.Device();
    } catch (error) {
      if (error.name === 'UnsupportedError') {
        console.error('browser not supported');
      }
    }
    await device.load({ routerRtpCapabilities });
  };

  const publishHandler = async e => {
    const isWebCam = e.target.id === 'btn_webcam';

    const publishText = isWebCam ? webcamText : screenText;

    setPublishText(publishText);

    const data = await socket.request('createProducerTransport', {
      forceTcp: false,
      rtpCapabilities: device.rtpCapabilities,
    });
    if (data.error) {
      console.error(data.error);
      return;
    }

    const transport = device.createSendTransport(data);
    transport.on('connect', async ({ dtlsParameters }, callback, errback) => {
      socket
        .request('connectProducerTransport', { dtlsParameters })
        .then(callback)
        .catch(errback);
    });

    transport.on(
      'produce',
      async ({ kind, rtpParameters }, callback, errback) => {
        try {
          const { id } = await socket.request('produce', {
            transportId: transport.id,
            kind,
            rtpParameters,
          });
          callback({ id });
        } catch (err) {
          errback(err);
        }
      }
    );

    transport.on('connectionstatechange', state => {
      switch (state) {
        case 'connecting':
          setPublishText('Publishing...');
          setIsPublishFieldSetDisabled(true);
          setIsSubscribeFieldSetDisabled(true);
          break;

        case 'connected':
          Video(stream);
          setPublishText('Published');
          setIsPublishFieldSetDisabled(true);
          setIsSubscribeFieldSetDisabled(false);
          break;

        case 'failed':
          transport.close();
          setPublishText('Published');
          setIsPublishFieldSetDisabled(false);
          setIsSubscribeFieldSetDisabled(true);
          break;

        default:
          break;
      }
    });

    let stream;
    try {
      // eslint-disable-next-line no-undef
      stream = await getUserMedia(transport, isWebcam);
      const track = stream.getVideoTracks()[0];
      const params = { track };
      if (isSimulcastChecked) {
        params.encodings = [
          { maxBitrate: 100000 },
          { maxBitrate: 300000 },
          { maxBitrate: 900000 },
        ];
        params.codecOptions = {
          videoGoogleStartBitrate: 1000,
        };
      }
      producer = await transport.produce(params);
    } catch (err) {
      setPublishText('failed');
    }
  };

  async function getUserMedia(transport, isWebCam) {
    if (!device.canProduce('video')) {
      console.error('cannot produce video');
      return;
    }

    let stream;
    try {
      // eslint-disable-next-line no-undef
      stream = isWebcam
        ? await navigator.mediaDevices.getUserMedia({ video: true })
        : await navigator.mediaDevices.getDisplayMedia({ video: true });
    } catch (err) {
      console.error('getUserMedia() failed:', err.message);
      throw err;
    }
    return stream;
  }

  async function subscribeHandler() {
    const data = await socket.request('createConsumerTransport', {
      forceTcp: false,
    });
    if (data.error) {
      console.error(data.error);
      return;
    }

    const transport = device.createRecvTransport(data);
    transport.on('connect', ({ dtlsParameters }, callback, errback) => {
      socket
        .request('connectConsumerTransport', {
          transportId: transport.id,
          dtlsParameters,
        })
        .then(callback)
        .catch(errback);
    });

    transport.on('connectionstatechange', async state => {
      switch (state) {
        case 'connecting':
          setPublishText('subscribing...');
          setIsSubscribeFieldSetDisabled(true);
          break;

        case 'connected':
          document.querySelector('#remote_video').srcObject = await stream;
          await socket.request('resume');
          setSubscribeText('subscribed');
          setIsSubscribeFieldSetDisabled(true);
          break;

        case 'failed':
          transport.close();
          setSubscribeText('failed');
          setIsSubscribeFieldSetDisabled(false);
          break;

        default:
          break;
      }
    });

    const stream = consume(transport);
  }

  async function consume(transport) {
    const { rtpCapabilities } = device;
    const data = await socket.request('consume', { rtpCapabilities });
    const { producerId, id, kind, rtpParameters } = data;

    let codecOptions = {};
    const consumer = await transport.consume({
      id,
      producerId,
      kind,
      rtpParameters,
      codecOptions,
    });
    const stream = new MediaStream();
    stream.addTrack(consumer.track);
    return stream;
  }

  return (
    <div>
      <table>
        <tr>
          <td>
            <div>Local</div>
            <video id="local_video" controls autoPlay playsInline />
          </td>
          <td>
            <div>Remote</div>
            <video id="remote_video" controls autoPlay playsInline />
          </td>
        </tr>
      </table>

      <table>
        <tr>
          <td>
            <fieldset id="fs_connection">
              <legend>Connection</legend>
              <div>
                <button
                  id="btn_connect"
                  disabled={isConnectButtonDisabled}
                  onClick={connectHandler}
                >
                  Connect
                </button>
                <span id="connection_status">{connectionText}</span>
              </div>
            </fieldset>
          </td>
          <td>
            <fieldset disabled={isPublishFieldSetDisabled} id="fs_publish">
              <legend>Publishing</legend>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={isSimulcastChecked}
                    id="chk_simulcast"
                    onCLick={setIsSimulcastChecked}
                  />
                  Use Simulcast
                </label>
              </div>
              <div>
                <button id="btn_webcam" onClick={publishHandler}>
                  Start Webcam
                </button>
                <span id="webcam_status">{publishText}</span>
              </div>
              <div>
                <button
                  id="btn_screen"
                  disabled={isScreenButtonDisabled}
                  onClick={publishHandler}
                >
                  Share Screen
                </button>
                <span id="screen_status">{publishText}</span>
              </div>
            </fieldset>
          </td>
          <td>
            <fieldset id="fs_subscribe" disabled={isSubscribeFieldSetDisabled}>
              <legend>Subscription</legend>
              <div>
                <button id="btn_subscribe" onClick={subscribeHandler}>
                  Subscribe
                </button>
                <span id="sub_status">{subscribeText}</span>
              </div>
            </fieldset>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Conversation;
