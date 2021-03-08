const express = require('express');
const { authToken, authAdmin } = require('../middleWare/auth');
const { cartsModel, validCart, validCartItem } = require('../models/cartsModel');
const router  = express.Router();

router.get('/', authToken, authAdmin, (req, res) => {
    let sort  = req.query.sort || '_id';
    let order = Number(req.query.revers) || 1;
    let skip  = Number(req.query.skip)   || 0;
    let limit = Number(req.query.limit)  || 10;
    
    cartsModel.find({}, {__v: 0, pass: 0})
    .sort({[sort]: order}).skip(skip).limit(limit)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.get('/get', authToken, (req, res) => {
    cartsModel.findOne({user_id: req.middle.user_id})
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.post('/add', (req, res) => {
    let {error} = validCart(req.body);
    if(error) return res.status(400).json(error.details);

    cartsModel.insertMany([{user_id: req.body.user_id}])
    .then(data => res.status(201).json(data))
    .catch(err => res.status(400).json({'err': err}));
});

router.put('/edit', authToken, (req, res) => {
    req.body.user_id = req.middle.user_id;
    let {error} = validCart(req.body);
    if(error) return res.status(400).json(error.details);

    cartsModel.updateOne({user_id: req.body.user_id}, {items: req.body.items})
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.put('/addItem', authToken, async(req, res) => {
    let { error } = validCartItem(req.body);
    if(error) return res.status(400).json(error.details);
    try {
        let result;
        let prod = await cartsModel.findOne({user_id: req.middle.user_id ,items: {$elemMatch: {prod_id: req.body.prod_id}}});
        if(prod) return res.redirect(307, '/carts/changeItem');    
        else result = await cartsModel.updateOne({$push: {items: req.body}});
        res.json(result);
    } catch(err) {
        console.log(err);
        res.status(400).json(err)
    }
});

router.put('/changeItem', authToken, (req, res) => {
    let { error } = validCartItem(req.body);
    if(error) return res.status(400).json(error.details);
    cartsModel.updateOne(
        {user_id: req.middle.user_id, items: {$elemMatch: {prod_id: req.body.prod_id}}},
        {$set: {'items.$.amount': req.body.amount, 'items.$.payment': req.body.payment, 'items.$.date_updated': Date.now()}})
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.put('/removeItem', authToken, (req, res) => {
    cartsModel.updateOne(
        {user_id: req.middle.user_id, items: {$elemMatch: {prod_id: req.body.prod_id}}},
        {$pull: {items: {prod_id: req.body.prod_id}}})
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.delete('/delete/:user_id', authToken, authAdmin, (req, res) => {
    cartsModel.deleteOne({user_id: req.params.user_id})
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

module.exports = router;