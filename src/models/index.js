import Event from './events';
import WorkSession from './work_sessions';
import WindowSwitch from './window_switches';

const Models = { Event, WorkSession, WindowSwitch };

// Перезапись таблиц
// Models.Event.sync({force: true});
// Models.WorkSession.sync({force: true});
// Models.WindowSwitch.sync({force: true});

export default Models;

