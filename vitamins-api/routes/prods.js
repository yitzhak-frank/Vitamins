const express = require('express');
const { url } = require('../config/general');
const { authToken, authAdmin, removeImage } = require('../middleWare/auth');
const { prodsModel, validProd } = require('../models/prodsModel');
const router = express.Router();

router.get('/', (req, res) => {
    let sort  = req.query.sort || '_id';
    let order = Number(req.query.order) || 1;
    let skip  = Number(req.query.skip)  || 0;
    let limit = Number(req.query.limit) || 10;
    prodsModel.find()
    .sort({[sort]: order}).skip(skip).limit(limit)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.get('/all', (req, res) => {
    prodsModel.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.get('/single/:id', (req, res) => {
    prodsModel.findOne({_id: req.params.id})
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.get('/search', (req, res) => {
    let sort  = req.query.sort || '_id';
    let order = Number(req.query.order) || 1;
    let skip  = Number(req.query.skip)  || 0;
    let limit = Number(req.query.limit) || 10;

    let search = req.query.q;
    let fields = req.query.fields.split(',');
    prodsModel.find({$or: fields.map(field => ({[field]: field === 'price' ? search : { $regex: search, $options: 'i'} }))})
    .sort({[sort]: order}).skip(skip).limit(limit)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.get('/count', (req, res) => {
    prodsModel.countDocuments()
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.get('/searchCount', (req, res) => {
    let search = req.query.q;
    let fields = req.query.fields.split(',');
    prodsModel.find({$or: fields.map(field => ({[field]: field === 'price' ? search : { $regex: search, $options: 'i'} }))})
    .countDocuments()
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.post('/addProdImg', authToken, authAdmin, (req, res) => {
    let img = req.files.myImg;
    if(!img) return res.status(400).json({massage: 'you need to send img'});
    else if(img.size >= 50 * 1024 * 1024) return res.status(400).json({message: 'the file is to big'});
    img.mv('public/prods_images/' + img.name, (err) => {
        if(err) return res.status(400).json({err})
    });
    // delete the old image
    if(req.query.id) removeImage(req.query.id);
    res.json({massage: 'file upload successfuly', imgUrl: `${url}/prods_images/${img.name}`});
});

router.post('/add', authToken, authAdmin, async(req, res) => {
    let validate = validProd(req.body);
    if(validate.error) return res.status(400).json(validate.error.details);

    prodsModel.insertMany([req.body])
    .then(data => res.status(201).json(data))
    .catch(err => res.status(400).json(err));
});

router.put('/edit', authToken, authAdmin, (req, res) => {
    let validate = validProd(req.body);
    if(validate.error) return res.status(400).json(validate.error.details);

    prodsModel.updateOne({_id: req.query.id}, req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.delete('/delete/:id', authToken, authAdmin, (req, res) => {
    removeImage(req.params.id);
    prodsModel.deleteOne({_id: req.params.id})
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

module.exports = router;