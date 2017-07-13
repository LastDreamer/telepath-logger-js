import activeWin from 'active-win';
import Handlers from './handlers';
import Models from './models';
import io from './server';
import formatTimestamp from './helpers/formatTimestamp';

const workdayStart = new Date();
workdayStart.setHours(workdayStart.getHours() - 4);
workdayStart.setHours(0, 0, 0, 0);

let sessionStart = new Date().getTime();
let sessionEnd = new Date().getTime();
let workToday = 0;

Models.WorkSession.findAll({
  where: {
    time_start: {
      gt: workdayStart,
    },
  },
}).then((sessions) => {
  sessions.forEach((session) => {
    workToday += session.get('duration');
  });
  io.emit('changeWorkToday', formatTimestamp(workToday));
});

const checkSession = () => {
  const now = new Date().getTime();
  const duration = sessionEnd - sessionStart;

  if (now > sessionEnd + 300000) {
    Models.WorkSession.create({
      time_start: new Date(sessionStart),
      time_end: new Date(sessionEnd),
      duration,
    });
    sessionStart = now;
    sessionEnd = now;
    workToday += duration;
  } else {
    sessionEnd = now;
  }
  io.emit('changeSession', formatTimestamp(duration));
  io.emit('changeWorkToday', formatTimestamp(workToday + duration));
};

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
    checkSession();
  }
});

Handlers.mouse((event) => {
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
    if (event.type === 'mouseclick') {
      clicks += 1;
      io.emit('clicksChange', clicks);
      Models.Event.create({
        type: 'mouseclick',
      });
    }
    checkSession();
  });
});
