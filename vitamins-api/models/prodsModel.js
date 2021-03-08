const mongoose = require('mongoose');
const joi = require('joi');

const prodsSchema = new mongoose.Schema({
    name:        String,
    description: String,
    more_info:   String,
    image:       String,
    price:       Number,
    date_created: {
        type: Date,
        default: Date.now()
    }
});

exports.prodsModel = mongoose.model('products', prodsSchema);

exports.validProd = (_record) => {
    let scehma = joi.object({
        _id:         joi.any(),
        name:        joi.string().min(2).max(100).required(),
        description: joi.string().min(2).max(100).required(),
        more_info:   joi.string().min(2).max(5000).required(),
        image:       joi.string().min(2).max(200).required(),
        price:       joi.number().required()
    });
    return scehma.validate(_record);
}