import { DataTypes } from 'sequelize';
import { db } from './init';

export const WorkSession = db.define('sessions', {}, {
  underscored: true
});

WorkSession.removeAttribute('id');

