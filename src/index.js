import activeWin from 'active-win';
import Handlers from './handlers';
import Models from './models';
import io from './server';

const workdayStart = new Date();
workdayStart.setHours(4, 0, 0, 0);
// const sessionStart = new Date();

let currentApp = '';
let keystrokes = 0;

Models.Event.findAndCount({
  where: {
    type: 'keystroke',
    time: {
      gt: workdayStart,
    },
  },
}).then((result) => {
  keystrokes = result.count;
  io.emit('changedKeystrokes', keystrokes);
});

let clicks = 0;
Models.Event.findAndCount({
  where: {
    type: 'mouseclick',
    time: {
      gt: workdayStart,
    },
  },
}).then((result) => {
  clicks = result.count;
  io.emit('clicksChange', clicks);
});

let windowSwitches = 0;
Models.WindowSwitch.findAndCount({
  where: {
    time: {
      gt: workdayStart,
    },
  },
}).then((result) => {
  windowSwitches = result.count;
  io.emit('shitchWindow', windowSwitches);
});

io.on('connection', (socket) => {
  socket.emit('changedApp', currentApp);
  socket.emit('changedKeystrokes', keystrokes);
  socket.emit('shitchWindow', windowSwitches);
  socket.emit('clicksChange', clicks);
});


Handlers.keyboard((key) => {
  activeWin().then((result) => {
    if (result.app !== currentApp) {
      currentApp = result.app;
      io.emit('changedApp', result.app);
      windowSwitches += 1;
      io.emit('shitchWindow', windowSwitches);
      Models.WindowSwitch.create({
        windowNane: result.app,
      });
    }
  });

  if (key) {
    keystrokes += 1;
    io.emit('changedKeystrokes', keystrokes);
    io.emit('lastChar', key);
    Models.Event.create({
      type: 'keystroke',
      meta: { key },
    });
  }
});

Handlers.mouse((/* event */) => {
  activeWin().then((result) => {
    if (result.app !== currentApp) {
      currentApp = result.app;
      io.emit('changedApp', result.app);
      windowSwitches += 1;
      io.emit('shitchWindow', windowSwitches);
      Models.WindowSwitch.create({
        windowNane: result.app,
      });
    }
    clicks += 1;
    io.emit('clicksChange', clicks);
    Models.Event.create({
      type: 'mouseclick',
    });
  });
});
