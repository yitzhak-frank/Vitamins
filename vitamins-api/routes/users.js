const express = require('express');
const bcrypt  = require('bcrypt');
const _       = require('lodash');
const { usersModel, createToken, validUser, validLogin, validAddUserByAdmin, validEditUserByAdmin } = require('../models/usersModel');
const { authToken, authAdmin, securePassword } = require('../middleWare/auth');
const router  = express.Router();

router.get('/', authToken, authAdmin, (req, res) => {
    let sort  = req.query.sort || '_id';
    let order = Number(req.query.order) || 1;
    let skip  = Number(req.query.skip)  || 0;
    let limit = Number(req.query.limit) || 10;

    usersModel.find({}, {__v: 0, pass: 0})
    .sort({[sort]: order}).skip(skip).limit(limit)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
    
});

router.get('/user', authToken, (req, res) => {
    usersModel.findOne({_id: req.middle._id}, {__v: 0, pass: 0})
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.get('/checkLogin', authToken, (req, res) => res.json({message: 'login'}));

router.get('/checkAdmin', authToken, authAdmin, (req, res) => res.status(200).json({message: 'admin'}));

router.get('/stayLogin', authToken, (req, res) => {
    let myToken = createToken(req.middle.email, req.middle.user_id, req.middle.role);
    res.json({token: myToken});
});

router.get('/count', (req, res) => {
    usersModel.countDocuments()
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.get('/searchCount', authToken, authAdmin, (req, res) => {
    let search = req.query.q;
    let fields = req.query.fields.split(',');
    usersModel.find({$or: fields.map(field => ({[field]: { $regex: search, $options: 'i' }}))})
    .countDocuments()
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.get('/single/:id', (req, res) => {
    usersModel.findOne({_id: req.params.id})
    .then(data => res.json(_.pick(data, ['_id', 'name', 'email', 'role', 'date_created'])))
    .catch(err => res.status(400).json(err));
});

router.get('/search', authToken, authAdmin, (req, res) => {
    let sort  = req.query.sort || '_id';
    let order = Number(req.query.order) || 1;
    let skip  = Number(req.query.skip)  || 0;
    let limit = Number(req.query.limit) || 10;

    let search = req.query.q;
    let fields = req.query.fields.split(',');
    usersModel.find({$or: fields.map(field => ({[field]: { $regex: search, $options: 'i' }}))})
    .sort({[sort]: order}).skip(skip).limit(limit)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.post('/add', authToken, authAdmin, async(req, res) => {
    let validation = validAddUserByAdmin(req.body);
    if(validation.error) return res.status(400).json(validation.error.details);

    let user = await usersModel.findOne({email: req.body.email});
    if(user) return res.status(409).json('email alredy in use');
    
    req.body.pass = await securePassword(req.body.pass);
    usersModel.insertMany([req.body])
    .then(data => res.status(201).json(_.pick(data[0], ['_id', 'name', 'email', 'role', 'date_created'])))
    .catch(err => res.status(400).json(err));
});

router.post('/signUp', async(req, res) => {
    let validation = validUser(req.body);
    if(validation.error) return res.status(400).json(validation.error.details);

    let user = await usersModel.findOne({email: req.body.email});
    if(user) return res.status(409).json('email alredy in use');

    req.body.pass = await securePassword(req.body.pass);
    usersModel.insertMany([req.body])
    .then(data => res.status(201).json(_.pick(data[0], ['_id', 'name', 'email', 'role', 'date_created'])))
    .catch(err => res.status(400).json(err));
});

router.put('/edit', authToken, authAdmin, async(req, res) => {
    let validation = validEditUserByAdmin(req.body);
    if(validation.error) return res.status(400).json(validation.error.details);
    try{
        if(req.body.pass) req.body.pass = await securePassword(req.body.pass);
        let data = await usersModel.updateOne({_id: req.query.id}, req.body);
        res.status(201).json(_.pick(data[0], ['_id', 'name', 'email', 'role', 'date_created']));
    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/login', async(req, res) => {
    let validation = validLogin(req.body);
    if(validation.error) return res.status(400).json(validation.error.details);
    try {
        let user = await usersModel.findOne({email: req.body.email});
        if(!user) return res.status(400).json({message: 'invalid user or password'});

        let passwrod = await bcrypt.compare(req.body.pass, user.pass);
        if(!passwrod) return res.status(400).json({message: 'invalid user or password'});

        let myToken = createToken(user.email, user._id, user.role);
        res.json({token: myToken, name: user.name, role: user.role});
    } catch(err) {
        res.status(400).json(err);
        console.log(err);
    }
});

router.delete('/delete/:id', authToken, authAdmin, (req, res) => {
    usersModel.deleteOne({_id: req.params.id})
    .then(() => res.redirect(`/carts/delete/${req.params.id}`))
    .catch(err => res.status(400).json(err));
});

module.exports = router;