const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const userData = sequelize.define('user',{
    'userid':{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    'username':{
        type:DataTypes.STRING,
        allowNull:false
    },
    'email':{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    'password':{
        type:DataTypes.STRING,
        allowNull:false
    },
    'branch':{
        type:DataTypes.STRING,
        allowNull:true
    }
}, {
  tableName: 'user',
  timestamps: false  
})

module.exports=userData;