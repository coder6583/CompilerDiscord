"use strict";
var Discord = require('discord.js');
var dotenv = require('dotenv');
var _a = require('./config.json'), prefix = _a.prefix, command = _a.command;
var client = new Discord.Client();
dotenv.config();
client.on('ready', function () {
    console.log("Logged in as " + client.user.tag + "!");
});
client.on('message', function (msg) {
    //   if (msg.content === 'ping') {
    //     msg.reply('Pong!');
    //   }
    var line = msg.content;
    msg.channel.send(line);
    if (msg.content == prefix + "ping") {
        msg.channel.send('yea');
    }
});
client.login(process.env.TOKEN);
