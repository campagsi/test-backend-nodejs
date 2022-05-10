const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {

    const authHeader = req.headers.autorization;

    if(!authHeader)
        return res.status(401).send({error: "no token provided"});

    const parts = authHeader.split(' ')    

    if(!parts.length === 2)
        return res.status(401).send({error: "token error"});

    const [scheme, token] = parts;
    
    // if(!/^Bearer$^/i.test(scheme))
    //     return res.status(401).send({error: "token malformad"});

    //console.log(jwt.sign({id: id}, authConfig.secret, {expiresIn: authConfig.expire} ))

    // jwt.verify(token, authConfig.secret, (err, decoded) => {
    //     if(err) return res.status(401).send({error: 'Token invalid'});

    //     req.userId = decoded.id;
    //     return next();
    // });
    return next();

}