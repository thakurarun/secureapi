// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
    username: String, 
    password: String, 
    name: String,
    number: Schema.Types.Number,
    countryCode: Schema.Types.String,
    face: Schema.Types.String,
    isActive: { type : Schema.Types.Boolean, default: true },
    createdDate: { type : Schema.Types.Date, default: Date.now }
}));