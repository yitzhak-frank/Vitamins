const mongoose = require('mongoose');
const {secret} = require('../config/secret');

mongoose.connect(`mongodb+srv://${secret.mongoUser}:${secret.mongoPass}@cluster0.hinbc.mongodb.net/vitamins`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("mongo connected"));