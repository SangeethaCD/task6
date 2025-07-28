require('dotenv').config();
const {Sequelize} = require('sequelize');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect:  'postgres' 
});

sequelize.authenticate()
.then(()=>{console.log("The db is conncted")})
.catch((err)=>{console.log(err)})


module.exports = sequelize;