import { createExpressApp } from './app';
import { mediasoup as config } from './config/mediasoup';
import {
  createConsumer,
  createTransport,
  runMediasoupWorker,
} from './mediasoup';
import runSocketServer from './ws/connect';
import createWebServer from './webserver';

let webServer;
let expressApp;
let mediasoupRouter = await runMediasoupWorker(config);

const runWebServer = async (config, expressApp) => {
  webServer = createWebServer(config, expressApp);
  webServer.on('error', err => {
    console.error('Starting web server failed.', err.message);
  });

  await new Promise(resolve => {
    const { listenIp, listenPort } = config;
    webServer.listen(listenPort, listenIp, () => {
      const listenMultipleIps = config.mediasoup.webRtcTransport.listenIps[0];
      const ip = listenMultipleIps.announcedIp || listenMultipleIps.ip;
      console.log('Server started running succesfully.');
      console.log(`Hosted on https://${ip}:${listenPort}`);
      resolve(null);
    });
  });
};

const WebRtc = {
  mediasoupRouter,
  createConsumer,
  createTransport,
  config,
};

(async () => {
  try {
    expressApp = await createExpressApp();
    await runWebServer(config, expressApp);
    await runSocketServer(webServer, WebRtc);
  } catch (err) {
    console.error(err);
  }
})();
