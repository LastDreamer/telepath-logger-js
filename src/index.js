import activeWin from 'active-win';
import { Keyboard, Mouse } from './handlers';
import { Event, WorkSession, WindowSwitch } from './models';
import socket from 'socket.io';
import { io } from './server';


// Перезапись таблиц
// Event.sync({force: true});
// WorkSession.sync({force: true});
// WindowSwitch.sync({force: true});


let currentApp = '';
let keystrokes = 0;
Event.findAndCount({ where: { type: 'keystroke' } }).then(result => {
  keystrokes = result.count;
}, error => console.log(error));

let clicks = 0;
Event.findAndCount({ where: { type: 'mouseclick' } }).then(result => {
  clicks = result.count;
}, error => console.log(error));

let windowSwitches = 0;
WindowSwitch.findAndCount().then(result => {
  windowSwitches = result.count;
}, error => console.log(error));

io.on('connection', function(socket){
  socket.emit('changedApp', currentApp);
  socket.emit('changedKeystrokes', keystrokes);
  socket.emit('shitchWindow', windowSwitches);
  socket.emit('clicksChange', clicks);
});


Keyboard.init((key) => {
  activeWin().then(result => {
    if (result.app != currentApp) {
      currentApp = result.app;
      io.emit('changedApp', result.app);
      windowSwitches++;
      io.emit('shitchWindow', windowSwitches);
      WindowSwitch.create({
        windowNane: result.app
      });
    }
  });

  if (key) {
    keystrokes++;
    io.emit('changedKeystrokes', keystrokes);
    io.emit('lastChar', key);
    Event.create({
      type: 'keystroke',
      meta: { key: key }
    });
  }
});

Mouse.init((event) => {
  activeWin().then(result => {
    if (result.app != currentApp) {
      currentApp = result.app;
      io.emit('changedApp', result.app);
      windowSwitches++;
      io.emit('shitchWindow', windowSwitches);
      WindowSwitch.create({
        windowNane: result.app
      });
    }
    clicks++;
    io.emit('clicksChange', clicks);
    Event.create({
      type: 'mouseclick'
    });
  });
});
