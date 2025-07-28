const express = require('express');
const app = express();
const db= require('./config/database');
const userCreation = require('./routes/userRoutes');
const loginValidation = require('./routes/loginRoutes');
const accountDetails = require('./routes/accountdetails');
const path = require('path')
app.use(express.json());

db.authenticate()
.then(()=>{console.log("The db is conncted")})
.catch((err)=>{console.log(err)})


app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use('/signup',userCreation);
app.use('/login',loginValidation);
app.use('/user',accountDetails);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login/login.html'));
});


app.listen(3000);