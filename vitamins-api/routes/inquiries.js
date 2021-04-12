const express = require('express');
const { date } = require('joi');
const { authToken, authAdmin } = require('../middleWare/auth');
const { inquiriesModule, validInquiry, validStatus } = require('../models/inquiriesModule');
const router  = express.Router();

router.get('/', authToken, authAdmin, (req, res) => {
    let sort  = req.query.sort || '_id';
    let order = Number(req.query.order) || 1;
    let skip  = Number(req.query.skip)   || 0;
    let limit = Number(req.query.limit)  || 10;
    inquiriesModule.find()
    .sort({[sort]: order}).skip(skip).limit(limit)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.get('/all', authToken, authAdmin, (req, res) => {
    inquiriesModule.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.get('/single/:id', authToken, authAdmin, (req, res) => {
    inquiriesModule.findOne({_id: req.params.id})
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.get('/search', authToken, authAdmin, (req, res) => {
    let sort  = req.query.sort || '_id';
    let order = Number(req.query.order) || 1;
    let skip  = Number(req.query.skip)  || 0;
    let limit = Number(req.query.limit) || 10;

    let search = req.query.q;
    let fields = req.query.fields.split(',');
    inquiriesModule.find({$or: fields.map(field => ({[field]: { $regex: search, $options: 'i' }}))})
    .sort({[sort]: order}).skip(skip).limit(limit)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.get('/count', authToken, authAdmin, (req, res) => {
    inquiriesModule.countDocuments()
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.get('/searchCount', authToken, authAdmin, (req, res) => {
    let search = req.query.q;
    let fields = req.query.fields.split(',');
    inquiriesModule.find({$or: fields.map(field => ({[field]: { $regex: search, $options: 'i' }}))})
    .countDocuments()
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.get('/isOpenedCount', authToken, authAdmin, (req, res) => {
    inquiriesModule.find({isOpened: false})
    .countDocuments()
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.post('/add', authToken, async(req, res) => {
    let validate = validInquiry(req.body);
    if(validate.error) return res.status(400).json(validate.error.details);

    inquiriesModule.insertMany([req.body])
    .then(data => res.status(201).json(data))
    .catch(err => res.status(400).json(err));
});

router.patch('/update', authToken, authAdmin, (req, res) => {
    let validate = validStatus(req.body);
    if(validate.error) return res.status(400).json(validate.error.details);

    inquiriesModule.updateOne({_id: req.query.id}, {...req.body, date_updated: Date.now()})
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

router.delete('/delete/:id', authToken, authAdmin, (req, res) => {
    inquiriesModule.deleteOne({_id: req.params.id})
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

module.exports = router;