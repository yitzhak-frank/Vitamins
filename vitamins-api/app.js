const express = require('express');
const path    = require('path');

const { routesInit, originCors, fileUploadAccess } = require('./routes/app_routs');
const dbConnector = require('./db/dbConnector');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

fileUploadAccess(app);
originCors(app);
routesInit(app);

let port = process.env.PORT || 3001;
app.listen(port);