import Sequelize from 'sequelize';

import db from '../db/database.js';

const DataTypes = Sequelize;

const Book = db.define(
  'book',
  {
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export default Book;

(async () => {
  await db.sync();
})();