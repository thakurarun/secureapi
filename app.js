var uuid = require('node-uuid');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken'); 

var dbConfig = require('./config/DbConfig.js'); 
var appConfig = require('./config/AppConfig.js');

//Loading Mongoose models
require('./AppCode/LoadModels.js')();

var port = process.env.PORT || 8080; 
mongoose.connect(dbConfig.database);
require('./AppCode/RunOnce.js')(app);
app.set('superSecret', appConfig.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));// use morgan to log requests to the console

app.get('/', function (req, res) {
    res.send('The API is at http://localhost:' + port + '/api');
});

// get an instance of the router for api routes
var apiRoutes = express.Router();

apiRoutes.use(function (req, res, next) {
    switch (req.method) {
        case "GET": {
            break;
        }
        case "POST": {
            //req.body
            break;
        }
        default: { break; }
    }
    next();
});
apiRoutes.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    next();
});
//Loading routes
require('./AppCode/LoadRouter.js')(apiRoutes);

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, function (err) { 
        console.log(err || ("application is up and running at " + port)) ;
});