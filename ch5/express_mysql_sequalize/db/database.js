import Sequelize from 'sequelize';

const db = new Sequelize('synrgy-ch5-crud', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;