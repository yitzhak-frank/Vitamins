const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/secret');

const usersSchema = new mongoose.Schema({
    name:  String,
    email: String,
    pass:  String,
    role: {
        type: String,
        default: "regular"
    }, 
    date_created: {
        type: Date,
        default: Date.now()
    }
});

exports.usersModel = mongoose.model('users', usersSchema);

exports.validUser = (user) => {
    let scehma = joi.object({
        _id:   joi.any(),
        name:  joi.string().min(2).max(100).required(),
        email: joi.string().min(2).max(100).email().required(),
        pass:  joi.string().min(2).max(100).required()
    });
    return scehma.validate(user);
}

exports.validAddUserByAdmin = (user) => {
    let scehma = joi.object({
        _id:   joi.any(),
        name:  joi.string().min(2).max(100).required(),
        email: joi.string().min(2).max(100).email().required(),
        pass:  joi.string().min(2).max(100).required(),
        role:  joi.string().min(2).max(100).required()
    });
    return scehma.validate(user);
}

exports.validEditUserByAdmin = (user) => {
    let scehma = joi.object({
        _id:   joi.any(),
        name:  joi.string().min(2).max(100).required(),
        email: joi.string().min(2).max(100).email().required(),
        pass:  joi.string().min(2).max(100),
        role:  joi.string().min(2).max(100).required()
    });
    return scehma.validate(user);
}

exports.validLogin = (info) => {
    let scehma = joi.object({
        email: joi.string().min(2).max(100).email().required(),
        pass:  joi.string().min(2).max(100).required(),
    });
    return scehma.validate(info);
}

exports.createToken = (email, id, role) => jwt.sign({email , id, role}, secret.tokenWord);//, {expiresIn: '60mins'}