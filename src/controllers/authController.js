const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const User = require('../models/user');

router = express.Router();

function generateToken(id){
    return jwt.sign({id: id}, authConfig.secret, {expiresIn: authConfig.expire} );
}

router.post('/register', async (req, res) => {

    const {email} = req.body;
    try{

        if( await User.findOne({email}) )
            return res.status(400).send({ error : 'User already exists!'})

        // console.log('post cadastro');
        // console.log(req.body)
        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({user, "token": generateToken({"id":user.id})});
    }catch(err){
        return res.status(400).send({error:  "ops ocorreu um erro"});
    };
})

router.post('/autenticate', async (req, res) => {


    const {email, password} =  req.body
    
    const user= await User.findOne({email}).select('+password');
    
    if(!user)
        return res.status(400).send({ error : 'User not faund!'})

    if(!await bcrypt.compare(password, user.password))    
        return res.status(400).send({ error : 'invalid Password!'})

    user.password = undefined;

    return res.send({user, "token": generateToken({"id":user.id})});

})


module.exports = router;