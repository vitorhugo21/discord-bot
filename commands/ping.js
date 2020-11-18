const Ping = {
  name: 'ping',
  description: 'Ping!',
  execute(message) {
    message.channel.send('pong');
  },
};

module.exports = Ping;
