const Discord = require('discord.js');
const dotenv = require('dotenv');
const {prefix, command} = require('./config.json');

const client = new Discord.Client();
dotenv.config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
//   if (msg.content === 'ping') {
//     msg.reply('Pong!');
//   }
  let line = msg.content;
  // msg.channel.send(line);
  if(line[0] == '#')
  {
    msg.channel.send('yea');
  }
});

client.login(process.env.TOKEN);