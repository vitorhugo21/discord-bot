const Discord = require('discord.js');
const botCommands = require('./commands');
require('dotenv').config();

const bot = new Discord.Client();
const token = process.env.DISCORD_BOT_TOKEN;
const prefix = '!';
bot.commands = new Discord.Collection();

Object.keys(botCommands).forEach((command) => {
  bot.commands.set(botCommands[command].name, botCommands[command]);
});

bot.once('ready', () => {
  console.log('Ready!');
});

bot.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!bot.commands.has(commandName)) {
    message.reply('command not found!');
  } else {
    const command = bot.commands.get(commandName);

    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;

      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }

      message.channel.send(reply);
    } else {
      try {
        command.execute(message, args);
      } catch (error) {
        message.reply('there was an error trying to execute that command!');
      }
    }
  }
});

bot.login(token);
