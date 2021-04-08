const fileUpload  = require('express-fileupload');
const path        = require('path');
const indexRouter = require('./index');
const prodsRouter = require('./prods');
const usersRouter = require('./users');
const cartsRouter = require('./carts');

exports.routesInit = (app) => {
    app.use('/',      indexRouter);
    app.use('/prods', prodsRouter);
    app.use('/users', usersRouter);
    app.use('/carts', cartsRouter);

    app.use((req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));
}

exports.fileUploadAccess = (app) => app.use(fileUpload({limits: {fileSize: 50 * 1024 * 1024}}));

exports.originCors = (app) => {
    app.all('*',  (req, res, next) => {
        if (!req.get('Origin')) return next();
        res.set('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,x-auth-token');
        next();
    });
}