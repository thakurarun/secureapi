// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('LoginStatus', new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    loginDate: { type: Schema.Types.Date, default: Date.now },
    logoffDate: { type: Schema.Types.Date },
    isActive : { type: Boolean, default: true }
}));