const user = require('../models/users');

const loginValidation = async(req,res)=>{
    try{
        const{email,password} = req.body;
        const response = await user.findOne({where:{email}});
        if(!response)
        {
            return res.status(404).send("The user does not exists .Please signup first");
        }
        if(password!=response.password)
        {
            return res.status(401).send("The password is  wrong here");
        }
        res.status(200).send("The user is successfull at the login.");
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports = loginValidation;