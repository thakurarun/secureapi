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
app.set('superSecret', appConfig.secret);

require('./AppCode/RunOnce.js')(app);