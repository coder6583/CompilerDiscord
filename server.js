"use strict";
var Discord = require('discord.js');
var dotenv = require('dotenv');
var _a = require('./config.json'), prefix = _a.prefix, cmdPrefix = _a.cmdPrefix;
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
    // msg.channel.send(line);
    if (line[0] == '#') {
        msg.channel.send('command');
        var command = line.splice(1);
        msg.channel.send(command);
    }
});
client.login(process.env.TOKEN);
