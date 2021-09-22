import createProduce from '../producer';

const rtc = (
  socket,
  mediasoupRouter,
  createTransport,
  createConsumer,
  config
) => {
  let producerTransport;
  let producer;
  let consumer;
  let consumerTransport;

  if (producer) {
    socket.emit('newProducer');
  }

  const getRouterRtpCapabilities = (data, callback) => {
    callback(mediasoupRouter.rtpCapabilities);
  };

  const createProducerTransport = async (data, callback) => {
    try {
      const { transport, params } = await createTransport(
        config,
        mediasoupRouter
      );
      producerTransport = transport;
      callback(params);
    } catch (err) {
      console.error(err);
      callback({ error: err.message });
    }
  };

  const createConsumerTransport = async (data, callback) => {
    try {
      const { transport, params } = await createTransport(
        config,
        mediasoupRouter
      );
      consumerTransport = transport;
      callback(params);
    } catch (err) {
      console.error(err);
      callback({ error: err.message });
    }
  };

  const connectProducerTransport = async (data, callback) => {
    await producerTransport.connect({ dtlsParameters: data.dtlsParameters });
    callback();
  };

  const connectConsumerTransport = async (data, callback) => {
    await consumerTransport.connect({ dtlsParameters: data.dtlsParameters });
    callback();
  };

  const produce = async (data, callback) => {
    producer = createProduce(data, producerTransport);
    callback({ id: producer.id });
    // inform clients about new producer
    socket.broadcast.emit('newProducer');
  };

  const consume = async (data, callback) => {
    data = await createConsumer(
      producer,
      data.rtpCapabilities,
      mediasoupRouter,
      consumerTransport
    );
    callback(data.consumer);
  };

  const resume = async (data, callback) => {
    await consumer.resume();
    callback();
  };

  socket.on('getRouterRtpCapabilities', getRouterRtpCapabilities);
  socket.on('createProducerTransport', createProducerTransport);
  socket.on('createConsumerTransport', createConsumerTransport);
  socket.on('connectProducerTransport', connectProducerTransport);
  socket.on('connectConsumerTransport', connectConsumerTransport);
  socket.on('produce', produce);
  socket.on('consume', consume);
  socket.on('resume', resume);
};

export default rtc;
