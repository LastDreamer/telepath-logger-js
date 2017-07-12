import db from './init';

const WorkSession = db.define('sessions', {}, {
  underscored: true,
});

WorkSession.removeAttribute('id');

export default WorkSession;

