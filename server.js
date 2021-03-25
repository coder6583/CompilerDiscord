"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require('discord.js');
var dotenv = require('dotenv');
var _a = require('./config.json'), prefix = _a.prefix, cmdPrefix = _a.cmdPrefix;
var exec = require('child_process').exec;
var fs = require('fs');
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
    if (msg.author.bot)
        return;
    if (line[0] == '!') {
        var command = line.slice(1);
        if (command == 'start') {
            exec('sudo systemctl start compilerserver');
        }
        else if (command == 'stop') {
            exec('sudo systemctl stop compilerserver');
        }
        else if (command == 'restart') {
            exec('sudo systemctl restart compilerserver');
        }
        // let words = command.split(' ');
        // if(words[0])
    }
    else {
        var command = line;
        msg.channel.send(command);
        exec(command, function (err, stdout, stderr) {
            msg.channel.send('標準出力');
            if (stdout)
                msg.channel.send(stdout);
            msg.channel.send('標準エラー');
            if (stderr)
                msg.channel.send(stderr);
            if (err)
                msg.channel.send('Command Failed');
            else
                msg.channel.send('Command Successful');
        });
    }
});
fs.watchFile(__dirname + '/log', function (curr, prev) {
    console.log('file changed');
    fs.readFile(__dirname + '/log', function (err, data) {
        var change = data.slice(prev.size + 1);
        client.channels.fetch('server-console').then(function (channel) {
            channel.send('test');
        });
    });
});
client.login(process.env.TOKEN);
