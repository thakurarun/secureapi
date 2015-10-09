﻿// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('UserInRole', new Schema({
    user: { type: Schema.Types.ObjectId, ref:'User' },
    role: { type: Schema.Types.ObjectId, ref:'Role' },
    createdDate: { type: Date, default: Date.now },
    isActive : { type: Boolean, default: true }
}));