// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Relation', new Schema({
    userId: { type: Schema.ObjectId, ref: 'User' }, 
    relations: [{ type: Schema.ObjectId, ref: 'User' }],
    updatedOnDate: { type : Schema.Types.Date, default: Date.now }
}));