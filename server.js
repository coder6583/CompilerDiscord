"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require('discord.js');
var dotenv = require('dotenv');
var _a = require('./config.json'), prefix = _a.prefix, cmdPrefix = _a.cmdPrefix;
var exec = require('child_process').exec;
var fs = require('fs');
var fileSize = 0;
fs.readFile(__dirname + '/log', function (err, data) {
    fileSize = data.length;
});
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
            exec('sudo systemctl start compilerserver', function (err, stdout, stderr) {
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
            fs.writeFile(__dirname + '/log', '', function (err) {
                if (err)
                    msg.channel.send('Could not empty log file');
                else
                    msg.channel.send('Start process complete');
            });
        }
        else if (command == 'stop') {
            exec('sudo systemctl stop compilerserver', function (err, stdout, stderr) {
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
        else if (command == 'restart') {
            exec('sudo systemctl restart compilerserver', function (err, stdout, stderr) {
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
            fs.writeFile(__dirname + '/log', '', function (err) {
                if (err)
                    msg.channel.send('Could not empty log file');
                else
                    msg.channel.send('Restart complete');
            });
        }
        else if (command == 'update') {
            exec('cd /home/pi/Compiler & git pull');
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
        if (data.length == 0) {
            fileSize = 0;
        }
        else {
            console.log(data.length);
            console.log(fileSize);
            var change_1 = data.slice(fileSize);
            console.log(change_1.toString());
            client.channels.fetch('824546860655837194').then(function (channel) {
                channel.send('``' + change_1.toString() + '``');
            });
            fileSize = data.length;
        }
    });
});
client.login(process.env.TOKEN);
