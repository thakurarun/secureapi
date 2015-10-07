﻿// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Role', new Schema({
    name: String,
    createdDate: { type: Date, default: Date.now },
    isActive : { type: Boolean, default: true }
}));