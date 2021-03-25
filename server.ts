#!/usr/bin/env node

import { Message, TextChannel } from "discord.js";

const Discord = require('discord.js');
const dotenv = require('dotenv');
const {prefix, cmdPrefix} = require('./config.json');
const {exec} = require('child_process');
const fs = require('fs');

let fileSize = 0;
fs.readFile(__dirname + '/log', (err: Error, data: string) => {
  fileSize = data.length;
});

const client = new Discord.Client();
dotenv.config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg: any) => {
//   if (msg.content === 'ping') {
//     msg.reply('Pong!');
//   }
  let line = msg.content;
  // msg.channel.send(line);
  if(msg.author.bot) return;
  if(line[0] == '!')
  {
    let command = line.slice(1);
    if(command == 'start')
    {
      exec('sudo systemctl start compilerserver', (err: NodeJS.ErrnoException| null, stdout: any, stderr: any) => {
        msg.channel.send('標準出力');
        if(stdout)
          msg.channel.send(stdout);
        msg.channel.send('標準エラー');
        if(stderr)
          msg.channel.send(stderr);
        if(err)
          msg.channel.send('Command Failed');
        else
          msg.channel.send('Command Successful');
      });
      fs.writeFile(__dirname + '/log', '', (err: Error) => {
        if(err) msg.channel.send('Could not empty log file');
        else msg.channel.send('Start process complete');
      })
    }
    else if(command == 'stop')
    {
      exec('sudo systemctl stop compilerserver', (err: NodeJS.ErrnoException| null, stdout: any, stderr: any) => {
        msg.channel.send('標準出力');
        if(stdout)
          msg.channel.send(stdout);
        msg.channel.send('標準エラー');
        if(stderr)
          msg.channel.send(stderr);
        if(err)
          msg.channel.send('Command Failed');
        else
          msg.channel.send('Command Successful');
      });
    }

    else if(command == 'restart')
    {
      exec('sudo systemctl restart compilerserver', (err: NodeJS.ErrnoException| null, stdout: any, stderr: any) => {
        msg.channel.send('標準出力');
        if(stdout)
          msg.channel.send(stdout);
        msg.channel.send('標準エラー');
        if(stderr)
          msg.channel.send(stderr);
        if(err)
          msg.channel.send('Command Failed');
        else
          msg.channel.send('Command Successful');
      });
      fs.writeFile(__dirname + '/log', '', (err: Error) => {
        if(err) msg.channel.send('Could not empty log file');
        else msg.channel.send('Restart complete');
      })
    }

    else if(command == 'update')
    {
      exec('cd /home/pi/Compiler & git pull', (err: NodeJS.ErrnoException| null, stdout: any, stderr: any) => {
        exec('chmod +x /home/pi/Compiler/server/nodejs/https_server.js', (err: NodeJS.ErrnoException| null, stdout: any, stderr: any) => {
          msg.channel.send('標準出力');
          if(stdout)
            msg.channel.send(stdout);
          msg.channel.send('標準エラー');
          if(stderr)
            msg.channel.send(stderr);
          if(err)
            msg.channel.send('Command Failed');
          else
            msg.channel.send('Command Successful');
        })
      });
    }
    // let words = command.split(' ');
    // if(words[0])
  }
  else
  {
    let command = line;
    msg.channel.send(command);
    exec(command, (err: NodeJS.ErrnoException| null, stdout: any, stderr: any) => {
      msg.channel.send('標準出力');
      if(stdout)
        msg.channel.send(stdout);
      msg.channel.send('標準エラー');
      if(stderr)
        msg.channel.send(stderr);
      if(err)
        msg.channel.send('Command Failed');
      else
        msg.channel.send('Command Successful');
    })
  }
});

fs.watchFile(__dirname + '/log', (curr: any, prev: any) =>{
  console.log('file changed');
  fs.readFile(__dirname + '/log', (err: Error, data: string) =>{
    if(data.length == 0)
    {
      fileSize = 0;
    }
    else
    {
      console.log(data.length);
      console.log(fileSize);
      let change = data.slice(fileSize);
      console.log(change.toString());
      client.channels.fetch('824546860655837194').then((channel: any) => {
        (<TextChannel> channel).send('```' + change.toString()+ '```');
      });
      fileSize = data.length;
    }
  })
})

client.login(process.env.TOKEN);