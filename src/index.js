import activeWin from 'active-win';
import { Keyboard, Mouse } from './handlers';
import express from 'express';
import socket from 'socket.io';
import http from 'http';

const app = express();
const server = http.Server(app);
const io = socket(server);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});



//Logging handlers
Keyboard.init((key) => {
  activeWin().then(result => {
    console.log(result.app, key);
  });
});

Mouse.init((event) => {
  activeWin().then(result => {
    console.log(result.app, event.type);
  });
});
