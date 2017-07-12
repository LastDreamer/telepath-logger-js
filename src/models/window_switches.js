import { DataTypes } from 'sequelize';
import db from './_init';

const WindowSwitch = db.define('switches', {
  windowNane: DataTypes.STRING,
  time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
});

WindowSwitch.removeAttribute('id');

export default WindowSwitch;
