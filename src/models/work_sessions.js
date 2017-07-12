import { DataTypes } from 'sequelize';
import db from './_init';

const WorkSession = db.define('sessions', {
  time_start: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  time_end: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  duration: DataTypes.INTEGER,
}, {
  underscored: true,
  timestamps: false,
});

WorkSession.removeAttribute('id');

// WorkSession.sync({force: true});

export default WorkSession;

