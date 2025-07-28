const { DataTypes } = require('sequelize');
const db = require('../config/database');
const user = require('./users');


const accountDetails = db.define('accounts',{
    'account_no':{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    'account_name':{
        type:DataTypes.STRING,
        allowNull:false
    },
    'branch':{
        type:DataTypes.STRING,
        allowNull:false
    },
    'IFSC':{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    'balance':{
        type:DataTypes.FLOAT,
        allowNull:false
    }
},{
  tableName: 'accounts',
  timestamps: false  
})

user.hasMany(accountDetails);
accountDetails.belongsTo(user);

db.sync()
.then(()=>{console.log('the database is successfully connected.')})
.catch((err)=>{console.log(err)});


module.exports= accountDetails;