const amqp = require('amqplib/callback_api');

const emit = messages => {
  amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      const exchange = 'seminar';
      const key = messages.length > 0 ? messages[0] : 'anonymous.info';

      channel.assertExchange(exchange, 'topic', {
        durable: false,
      });
      channel.publish(exchange, key, Buffer.from(msg));
      console.log(" [x] Sent %s:'%s'", key, msg);
    });

    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 500);
  });
};
