const Discord = require('discord.js');
const dotenv = require('dotenv');
const {prefix, cmdPrefix} = require('./config.json');

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
  if(line[0] == `${cmdPrefix}`)
  {
    msg.channel.send('command');
    let command = line.splice(1);
    console.log(command);
  }
});

client.login(process.env.TOKEN);