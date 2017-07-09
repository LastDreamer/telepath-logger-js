import activeWin from 'active-win';
import { Keyboard, Mouse } from './handlers';
import express from 'express';
import socket from 'socket.io';
import http from 'http';

const app = express();
const server = http.Server(app);
const io = socket(server);

let currentApp = '';
let keystrokes = 0;
let windowSwitches = 0;
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.emit('changedApp', currentApp);
  socket.emit('changedApp', currentApp);
  socket.emit('shitchWindow', windowSwitches);
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});



//Logging handlers
Keyboard.init((key) => {
  activeWin().then(result => {
    if (result.app != currentApp) {
      console.log(result.app);
      currentApp = result.app;
      io.emit('changedApp', result.app);
      windowSwitches++;
      io.emit('shitchWindow', windowSwitches);
    }
  });

  if (key) {
    keystrokes++;
    io.emit('changedKeystrokes', keystrokes);
    io.emit('lastChar', key);
  }
});

Mouse.init((event) => {
  activeWin().then(result => {
    if (result.app != currentApp) {
      currentApp = result.app;
      io.emit('changedApp', result.app);
      console.log(result.title);
      windowSwitches++;
      io.emit('shitchWindow', windowSwitches);
    }
  });
});
