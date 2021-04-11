const mongoose = require('mongoose');
const joi = require('joi');

const inquiriesSchema = new mongoose.Schema({
    name:     String,
    email:    String,
    msg:      String,
    status:   {
        type: String,
        default: 'ממתין לטיפול'
    },
    comments: {
        type: String,
        default: ''
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref:  'users'
    },
    isOpened: {
        type: Boolean,
        default: false
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    date_updated: {
        type: Date,
        default: Date.now()
    }
});

exports.inquiriesModule = mongoose.model('inquiries', inquiriesSchema);

exports.validInquiry = (inquiry) => {
    let schema = joi.object({
        _id:       joi.any(),
        name:      joi.string().min(2).max(100).required(),
        email:     joi.string().min(2).max(100).email().required(),
        msg:       joi.string().min(16).max(500).required(),
        status:    joi.string().min(4).max(30),
        comments:  joi.string().min(4).max(500),
        user_id:   joi.string().required()
    });
    return schema.validate(inquiry);
}

exports.validStatus = (status) => {
    let schema = joi.object({
        status:    joi.string().min(4).max(30),
        comments:  joi.string().min(4).max(500),
        isOpened:  joi.boolean()
    });
    return schema.validate(status);
}