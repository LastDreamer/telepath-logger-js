import express from 'express';
import socket from 'socket.io';
import http from 'http';

const app = express();
const server = http.Server(app);
export const io = socket(server);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

server.listen(3000, function(){
  console.log('Server started');
});
