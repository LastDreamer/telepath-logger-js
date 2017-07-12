import { DataTypes } from 'sequelize';
import db from './_init';

const Event = db.define('events', {
  type: DataTypes.ENUM(['keystroke', 'mouseclick']),
  time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  meta: DataTypes.JSON,
}, {
  timestamps: false,
});

Event.removeAttribute('id');

// Models.Event.sync({force: true});

export default Event;
