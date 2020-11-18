const axios = require('axios');

const formatDate = (date) => {
  date = new Date(date);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
};

const all = async (message) => {
  const { data } = await axios.get('https://corona.lmao.ninja/v2/all');
  send(message, data);
};

const country = async (message, country) => {
  try {
    const { data } = await axios.get(
      `https://corona.lmao.ninja/v2/countries/${country}`
    );
    delete data.countryInfo;
    send(message, data);
  } catch (error) {
    message.channel.send(error.response.data.message);
  }
};

const send = (message, response) => {
  response.updated = formatDate(response.updated);
  const formatedMessage =
    '```json\n' + JSON.stringify(response, null, 2) + '\n```';
  message.channel.send(formatedMessage);
};

const Covid = {
  name: 'covid',
  description: 'Get the latest covid updates.',
  args: true,
  usage: '<Country name> or <all>',
  execute(message, args) {
    if (args[0] === 'all') {
      all(message);
    } else {
      country(message, args[0]);
    }
  },
};

module.exports = Covid;
