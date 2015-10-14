var uuid = require('node-uuid');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var appConfig = require('./config/AppConfig.js');
var dbConfig = require('./config/DbConfig.js');
var path = require('path');
global.appRoot = path.resolve(__dirname);
global.secretkey = appConfig.secret;
//Loading Mongoose models
require('./AppCode/LoadModels.js')();

var port = process.env.PORT || 8080; 
mongoose.connect(dbConfig.database);
require('./AppCode/RunOnce.js')(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));// use morgan to log requests to the console

app.get('/', function (req, res) {
    res.send('The API is at http://localhost:' + port + '/api');
});

// get an instance of the router for api routes
var apiRoutes = express.Router();
apiRoutes.use('/public',function (req, res, next) {
    next();
});
apiRoutes.use('/secure',function (req, res, next) {
    if (req.body.token) {
        jwt.verify(req.body.token, secretkey, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        next(new Error('No token provided')); // handle everything here
    }
});
apiRoutes.use(function (err, req, res, next) {
    res.status(500).send(err.message);
   // next();
});
//Loading routes
require('./AppCode/LoadRouter.js')(apiRoutes);

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

app.use(function (err, req, res, next) {
    res.status(500).send('Something broke!');
});

app.listen(port, function (err) { 
        console.log(err || ("application is up and running at " + port)) ;
});