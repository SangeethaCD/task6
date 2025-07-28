const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('banking_app', 'postgres', '2025', {
  host: 'localhost',
  dialect:  'postgres' 
});

module.exports = sequelize;