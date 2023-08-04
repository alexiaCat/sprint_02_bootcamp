const Sequelize = require('sequelize')
const dotenv = require("dotenv");

dotenv.config();


const sequelize = new Sequelize({
  host: process.env.HOST,
  username: process.env.USER,
  port: process.env.DB_PORT,
  password: process.env.PASSWORD,
  database: 'db_jwtbootcamp',
  dialect: 'postgres',
});

sequelize.options.logging = (query) => {

};

module.exports = sequelize;
