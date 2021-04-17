#!/usr/bin/env node
try
{
import { Message, TextChannel } from "discord.js";

const Discord = require('discord.js');
const dotenv = require('dotenv');
const {prefix, cmdPrefix} = require('./config.json');
const {exec} = require('child_process');
const fs = require('fs');

var fileSize = 0;
var errorfileSize = 0;
var adminfileSize = 0;
var erroradminfileSize = 0;
fs.readFile(__dirname + '/log', (err: Error, data: string) => {
  fileSize = data.length;
});
fs.readFile(__dirname + '/errorlog', (err: Error, data: string) => {
  errorfileSize = data.length;
});
fs.readFile(__dirname + '/adminlog', (err: Error, data: string) => {
  adminfileSize = data.length;
});
fs.readFile(__dirname + '/erroradminlog', (err: Error, data: string) => {
  erroradminfileSize = data.length;
});

const client = new Discord.Client();
dotenv.config();

client.on('ready', () => {
  console.log('a');
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg: any) => {
  console.log(msg.content);
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
        // else msg.channel.send('Start process complete');
      })
      fs.writeFile(__dirname + '/errorlog', '', (err: Error) => {
        if(err) msg.channel.send('Could not empty error log file');
        else msg.channel.send('Start process complete');
      })
    }
    else if(command == 'startadmin')
    {
      exec('sudo systemctl start admincompilerserver', (err: NodeJS.ErrnoException| null, stdout: any, stderr: any) => {
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
      fs.writeFile(__dirname + '/adminlog', '', (err: Error) => {
        if(err) msg.channel.send('Could not empty log file');
        // else msg.channel.send('Start process complete');
      })
      fs.writeFile(__dirname + '/erroradminlog', '', (err: Error) => {
        if(err) msg.channel.send('Could not empty error log file');
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
    else if(command == 'stopadmin')
    {
      exec('sudo systemctl stop admincompilerserver', (err: NodeJS.ErrnoException| null, stdout: any, stderr: any) => {
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
        // else msg.channel.send('Restart complete');
      })
      fs.writeFile(__dirname + '/errorlog', '', (err: Error) => {
        if(err) msg.channel.send('Could not empty error log file');
        else msg.channel.send('Restart complete');
      })
    }
    else if(command == 'restartadmin')
    {
      exec('sudo systemctl restart admincompilerserver', (err: NodeJS.ErrnoException| null, stdout: any, stderr: any) => {
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
      fs.writeFile(__dirname + '/adminlog', '', (err: Error) => {
        if(err) msg.channel.send('Could not empty log file');
        else msg.channel.send('Restart complete');
      })
      fs.writeFile(__dirname + '/erroradminlog', '', (err: Error) => {
        if(err) msg.channel.send('Could not empty error log file');
        else msg.channel.send('Restart complete');
      })
    }
    else if(command == 'update')
    {
      exec('git -C /home/pi/Compiler stash', (err: NodeJS.ErrnoException| null, stdout: any, stderr: any) => {
        if(err)
          msg.channel.send('Compiler Stash Failed');
          
        else
          msg.channel.send('Compiler Stash Successful');
        exec('git -C /home/pi/Compiler pull ', (err: NodeJS.ErrnoException| null, stdout: any, stderr: any) => {
          msg.channel.send('標準出力');
            if(stdout)
              msg.channel.send(stdout);
            msg.channel.send('標準エラー');
            if(stderr)
              msg.channel.send(stderr);
          exec('chmod +x /home/pi/Compiler/server/nodejs/https_server.js', (err: NodeJS.ErrnoException| null, stdout: any, stderr: any) => {
            if(err)
              msg.channel.send('Chmod Failed');
            else
              msg.channel.send('Chmod Successful');
          })
        })
      });
      exec('git -C /home/pi/AdminCompilerServer stash', (err: NodeJS.ErrnoException| null, stdout: any, stderr: any) => {
        if(err)
          msg.channel.send('Admin Stash Failed');
          
        else
          msg.channel.send('Admin Stash Successful');
        exec('git -C /home/pi/AdminCompilerServer pull ', (err: NodeJS.ErrnoException| null, stdout: any, stderr: any) => {
          msg.channel.send('標準出力');
            if(stdout)
              msg.channel.send(stdout);
            msg.channel.send('標準エラー');
            if(stderr)
              msg.channel.send(stderr);
          exec('chmod +x /home/pi/AdminCompilerServer/server/nodejs/https_server.js', (err: NodeJS.ErrnoException| null, stdout: any, stderr: any) => {
            if(err)
              msg.channel.send('Admin Chmod Failed');
            else
              msg.channel.send('Admin Chmod Successful');
          })
        })
      });
    }
    else
    {
      let args = command.split(' ');
      if(args[0] == 'ipblock')
      {
        if(!(args[1] === undefined))
        {
          fs.appendFile('/home/pi/ipBlacklist', args[1] + ';\n', (err: Error) => {
            if(!err)
            {
              msg.channel.send('Blacklisted ' + args[1]);
            }
          })
        }
        else
        {
          msg.channel.send('Expected ip address as second argument.');
        }
      }
    }
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
fs.watchFile(__dirname + '/errorlog', (curr: any, prev: any) =>{
  console.log('file changed');
  fs.readFile(__dirname + '/errorlog', (err: Error, data: string) =>{
    if(data.length == 0)
    {
      errorfileSize = 0;
    }
    else
    {
      console.log(data.length);
      console.log(errorfileSize);
      let change = data.slice(errorfileSize);
      console.log(change.toString());
      client.channels.fetch('824546860655837194').then((channel: any) => {
        (<TextChannel> channel).send('```' + change.toString()+ '```');
      });
      errorfileSize = data.length;
    }
  })
})
fs.watchFile(__dirname + '/adminlog', (curr: any, prev: any) =>{
  console.log('admin file changed');
  fs.readFile(__dirname + '/adminlog', (err: Error, data: string) =>{
    if(data.length == 0)
    {
      adminfileSize = 0;
    }
    else
    {
      console.log(data.length);
      console.log(adminfileSize);
      let change = data.slice(adminfileSize);
      console.log(change.toString());
      client.channels.fetch('828560653341163550').then((channel: any) => {
        (<TextChannel> channel).send('```' + change.toString()+ '```');
      });
      adminfileSize = data.length;
    }
  })
})
fs.watchFile(__dirname + '/erroradminlog', (curr: any, prev: any) =>{
  console.log('admin file changed');
  fs.readFile(__dirname + '/erroradminlog', (err: Error, data: string) =>{
    if(data.length == 0)
    {
      erroradminfileSize = 0;
    }
    else
    {
      console.log(data.length);
      console.log(erroradminfileSize);
      let change = data.slice(erroradminfileSize);
      console.log(change.toString());
      client.channels.fetch('828560653341163550').then((channel: any) => {
        (<TextChannel> channel).send('```' + change.toString()+ '```');
      });
      erroradminfileSize = data.length;
    }
  })
})

client.login(process.env.TOKEN);
} catch (error) {
  console.log(error);
}