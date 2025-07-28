
const user = require('../models/users');

const userCreation = async(req,res)=>{
   try{
    const {userid,username,email,password,branch}= req.body;
    const response = await user.create(
        {
            userid,
            username,
            email,
            password,
            branch
        }
    );
    console.log("The user is created successfully");
    console.log(response.toJSON());
    res.status(201).send(response.toJSON());
   }
   catch(err)
   {
    console.log(err);
    res.status(500).send(err);
   }
}


module.exports = userCreation;