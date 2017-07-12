import express from 'express';
import socket from 'socket.io';
import http from 'http';

const app = express();
const server = http.Server(app);
const io = socket(server);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
});

server.listen(3000, () => {
  console.log('Server started on http://localhost:3000'); //eslint-disable-line
});

export default io;
