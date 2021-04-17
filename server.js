#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
try {
    var Discord = require('discord.js');
    var dotenv = require('dotenv');
    var _a = require('./config.json'), prefix = _a.prefix, cmdPrefix = _a.cmdPrefix;
    var exec_1 = require('child_process').exec;
    var fs_1 = require('fs');
    var fileSize = 0;
    var errorfileSize = 0;
    var adminfileSize = 0;
    var erroradminfileSize = 0;
    fs_1.readFile(__dirname + '/log', function (err, data) {
        fileSize = data.length;
    });
    fs_1.readFile(__dirname + '/errorlog', function (err, data) {
        errorfileSize = data.length;
    });
    fs_1.readFile(__dirname + '/adminlog', function (err, data) {
        adminfileSize = data.length;
    });
    fs_1.readFile(__dirname + '/erroradminlog', function (err, data) {
        erroradminfileSize = data.length;
    });
    var client_1 = new Discord.Client();
    dotenv.config();
    client_1.on('ready', function () {
        console.log('a');
        console.log("Logged in as " + client_1.user.tag + "!");
    });
    client_1.on('message', function (msg) {
        console.log(msg.content);
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
                exec_1('sudo systemctl start compilerserver', function (err, stdout, stderr) {
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
                fs_1.writeFile(__dirname + '/log', '', function (err) {
                    if (err)
                        msg.channel.send('Could not empty log file');
                    // else msg.channel.send('Start process complete');
                });
                fs_1.writeFile(__dirname + '/errorlog', '', function (err) {
                    if (err)
                        msg.channel.send('Could not empty error log file');
                    else
                        msg.channel.send('Start process complete');
                });
            }
            else if (command == 'startadmin') {
                exec_1('sudo systemctl start admincompilerserver', function (err, stdout, stderr) {
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
                fs_1.writeFile(__dirname + '/adminlog', '', function (err) {
                    if (err)
                        msg.channel.send('Could not empty log file');
                    // else msg.channel.send('Start process complete');
                });
                fs_1.writeFile(__dirname + '/erroradminlog', '', function (err) {
                    if (err)
                        msg.channel.send('Could not empty error log file');
                    else
                        msg.channel.send('Start process complete');
                });
            }
            else if (command == 'stop') {
                exec_1('sudo systemctl stop compilerserver', function (err, stdout, stderr) {
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
            else if (command == 'stopadmin') {
                exec_1('sudo systemctl stop admincompilerserver', function (err, stdout, stderr) {
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
                exec_1('sudo systemctl restart compilerserver', function (err, stdout, stderr) {
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
                fs_1.writeFile(__dirname + '/log', '', function (err) {
                    if (err)
                        msg.channel.send('Could not empty log file');
                    // else msg.channel.send('Restart complete');
                });
                fs_1.writeFile(__dirname + '/errorlog', '', function (err) {
                    if (err)
                        msg.channel.send('Could not empty error log file');
                    else
                        msg.channel.send('Restart complete');
                });
            }
            else if (command == 'restartadmin') {
                exec_1('sudo systemctl restart admincompilerserver', function (err, stdout, stderr) {
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
                fs_1.writeFile(__dirname + '/adminlog', '', function (err) {
                    if (err)
                        msg.channel.send('Could not empty log file');
                    else
                        msg.channel.send('Restart complete');
                });
                fs_1.writeFile(__dirname + '/erroradminlog', '', function (err) {
                    if (err)
                        msg.channel.send('Could not empty error log file');
                    else
                        msg.channel.send('Restart complete');
                });
            }
            else if (command == 'update') {
                exec_1('git -C /home/pi/Compiler stash', function (err, stdout, stderr) {
                    if (err)
                        msg.channel.send('Compiler Stash Failed');
                    else
                        msg.channel.send('Compiler Stash Successful');
                    exec_1('git -C /home/pi/Compiler pull ', function (err, stdout, stderr) {
                        msg.channel.send('標準出力');
                        if (stdout)
                            msg.channel.send(stdout);
                        msg.channel.send('標準エラー');
                        if (stderr)
                            msg.channel.send(stderr);
                        exec_1('chmod +x /home/pi/Compiler/server/nodejs/https_server.js', function (err, stdout, stderr) {
                            if (err)
                                msg.channel.send('Chmod Failed');
                            else
                                msg.channel.send('Chmod Successful');
                        });
                    });
                });
                exec_1('git -C /home/pi/AdminCompilerServer stash', function (err, stdout, stderr) {
                    if (err)
                        msg.channel.send('Admin Stash Failed');
                    else
                        msg.channel.send('Admin Stash Successful');
                    exec_1('git -C /home/pi/AdminCompilerServer pull ', function (err, stdout, stderr) {
                        msg.channel.send('標準出力');
                        if (stdout)
                            msg.channel.send(stdout);
                        msg.channel.send('標準エラー');
                        if (stderr)
                            msg.channel.send(stderr);
                        exec_1('chmod +x /home/pi/AdminCompilerServer/server/nodejs/https_server.js', function (err, stdout, stderr) {
                            if (err)
                                msg.channel.send('Admin Chmod Failed');
                            else
                                msg.channel.send('Admin Chmod Successful');
                        });
                    });
                });
            }
            else {
                var args_1 = command.split(' ');
                if (args_1[0] == 'ipblock') {
                    if (!(args_1[1] === undefined)) {
                        fs_1.appendFile('/home/pi/ipBlacklist', args_1[1] + ';\n', function (err) {
                            if (!err) {
                                msg.channel.send('Blacklisted ' + args_1[1]);
                            }
                        });
                    }
                    else {
                        msg.channel.send('Expected ip address as second argument.');
                    }
                }
            }
        }
        else {
            var command = line;
            msg.channel.send(command);
            exec_1(command, function (err, stdout, stderr) {
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
    fs_1.watchFile(__dirname + '/log', function (curr, prev) {
        console.log('file changed');
        fs_1.readFile(__dirname + '/log', function (err, data) {
            if (data.length == 0) {
                fileSize = 0;
            }
            else {
                console.log(data.length);
                console.log(fileSize);
                var change_1 = data.slice(fileSize);
                console.log(change_1.toString());
                client_1.channels.fetch('824546860655837194').then(function (channel) {
                    channel.send('```' + change_1.toString() + '```');
                });
                fileSize = data.length;
            }
        });
    });
    fs_1.watchFile(__dirname + '/errorlog', function (curr, prev) {
        console.log('file changed');
        fs_1.readFile(__dirname + '/errorlog', function (err, data) {
            if (data.length == 0) {
                errorfileSize = 0;
            }
            else {
                console.log(data.length);
                console.log(errorfileSize);
                var change_2 = data.slice(errorfileSize);
                console.log(change_2.toString());
                client_1.channels.fetch('824546860655837194').then(function (channel) {
                    channel.send('```' + change_2.toString() + '```');
                });
                errorfileSize = data.length;
            }
        });
    });
    fs_1.watchFile(__dirname + '/adminlog', function (curr, prev) {
        console.log('admin file changed');
        fs_1.readFile(__dirname + '/adminlog', function (err, data) {
            if (data.length == 0) {
                adminfileSize = 0;
            }
            else {
                console.log(data.length);
                console.log(adminfileSize);
                var change_3 = data.slice(adminfileSize);
                console.log(change_3.toString());
                client_1.channels.fetch('828560653341163550').then(function (channel) {
                    channel.send('```' + change_3.toString() + '```');
                });
                adminfileSize = data.length;
            }
        });
    });
    fs_1.watchFile(__dirname + '/erroradminlog', function (curr, prev) {
        console.log('admin file changed');
        fs_1.readFile(__dirname + '/erroradminlog', function (err, data) {
            if (data.length == 0) {
                erroradminfileSize = 0;
            }
            else {
                console.log(data.length);
                console.log(erroradminfileSize);
                var change_4 = data.slice(erroradminfileSize);
                console.log(change_4.toString());
                client_1.channels.fetch('828560653341163550').then(function (channel) {
                    channel.send('```' + change_4.toString() + '```');
                });
                erroradminfileSize = data.length;
            }
        });
    });
    client_1.login(process.env.TOKEN);
}
catch (error) {
    console.log(error);
}
