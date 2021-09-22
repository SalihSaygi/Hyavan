const mediasoup = require('mediasoup');

async function runMediasoupWorker(config) {
  const worker = setupWorker(config)

  const mediasoup = setupMediasoupRouter(worker, config)
  return mediasoup
}

async function setupWorker(config) {
  const worker = await mediasoup.createWorker({
    logLevel: config.mediasoup.worker.logLevel,
    logTags: config.mediasoup.worker.logTags,
    rtcMinPort: config.mediasoup.worker.rtcMinPort,
    rtcMaxPort: config.mediasoup.worker.rtcMaxPort,
  });

  worker.on('died', () => {
    console.error('mediasoup worker died, exiting in 2 seconds... [pid:%d]', worker.pid);
    setTimeout(() => process.exit(1), 2000);
  });

  return worker
}

async function setupMediasoupRouter(worker, config) {
  const mediaCodecs = config.mediasoup.router.mediaCodecs;
  const mediasoupRouter = await worker.createRouter({ mediaCodecs });

  return mediasoupRouter
}

export default runMediasoupWorker