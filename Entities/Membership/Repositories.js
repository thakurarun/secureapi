var q = require("q");
var mongoose = require('mongoose');
var userModel = mongoose.model('User');

module.exports = (function () {
    return {
        Authenticate : function (data) {
            var options = {
                username : data.username,
                password : data.password
            };
            return userModel.findOne(options)
                .then(function (data) {
                if (data == null) {
                    return { "data" : "no record found" };
                }
                return { "data" : data.name };
            }, function (err) {
                return { "data" : "not ok" };
            });
        }
    }
});