const jwt = require('jsonwebtoken');
const fs  = require('fs');
const bcrypt = require('bcrypt');
const {secret} = require('../config/secret');
const { usersModel } = require('../models/usersModel');
const { prodsModel } = require('../models/prodsModel');

exports.authToken = (req, res, next) => {
    let token = req.header('x-auth-token');
    if(!token) return res.status(401).json({massage: "you must send token!"});
    try {
        let decodeToken = jwt.verify(token, secret.tokenWord);
        req.middle = {email: decodeToken.email, user_id: decodeToken._id};
        next();
    } catch(err) {
        res.status(401).json({massage: 'you token is invalid or expire!', err});
        console.log(err);
    }
}

exports.authAdmin = (req, res, next) => {
    usersModel.findOne({_id: req.middle.user_id}, {role: 1})
    .then(data => (data.role == 'admin') ? next() : res.status(401).json({massage: 'only admin can do this action'}))
    .catch(err => res.status(400).json(err));
}

exports.removeImage = async(_prodId) => {
    try {
        let imgUrl  = await prodsModel.findOne({_id: _prodId}, {image: 1});
        let imgPath = imgUrl.image.replace('http://localhost:3001', './public');
        fs.unlink(imgPath, (err) => { if(err) return console.log(err) });
    } catch(err){
        console.log(err);
    }
}

exports.securePassword = async(password) => {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}