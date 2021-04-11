const mongoose = require('mongoose');
const joi = require('joi');

const cartsSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref:  'users'
    },
    date_updated: {
        type:    Date,
        default: Date.now()
    },
    items: [{
        amount:  Number,
        payment: Number,
        prod_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:  'products'
        },
        date_updated: {
            type:    Date,
            default: Date.now()
        }
    }]
});

exports.cartsModel = mongoose.model('carts', cartsSchema);

exports.validCart = (cart) => {
    let schema = joi.object({
        user_id: joi.string().required(),
        items:   joi.array().items({
            prod_id: joi.string().required(),
            amount:  joi.number().required(),
            payment: joi.number().required()
        })
    });
    return schema.validate(cart);
}

exports.validCartItem = (item) => {
    let schema = joi.object({
        prod_id: joi.string().required(),
        amount:  joi.number().required(),
        payment: joi.number().required()
    });
    return schema.validate(item);
}