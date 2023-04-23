const redis = require('redis');

const CHANNELS = {
  TEST: 'TEST',
};

class PubSub {
  constructor() {
    this.subscriber = redis.createClient();
    this.publisher = redis.createClient();

    this.subscriber.subscribe(CHANNELS.TEST);
    this.subscriber.on('message', (channel, message) => {
      this.handleMessage(channel, message);
    });
  }
  handleMessage(channel, message) {
    console.log(`Message received. Chanel ${channel}, message: ${message}`);
  }
}

const testPubSub = new PubSub();

setTimeout(() => {
  testPubSub.publisher.publish(CHANNELS.TEST, 'Hello I am publisher');
}, 1000);
