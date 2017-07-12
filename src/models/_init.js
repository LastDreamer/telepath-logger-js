import Sequelize from 'sequelize';

const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite3',
});

export default db;
