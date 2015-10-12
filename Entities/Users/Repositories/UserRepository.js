var q = require("q");
var mongoose = require('mongoose');
var userModel = mongoose.model('User');
var userInRoleModel = mongoose.model('UserInRole');
var roleModel = mongoose.model('Role');
module.exports = (function () {
    return {
        addNewUser : function (user) {
            var options = {
                number : user.number
            };
            var p1 = userModel.findOne(options);
            var p2 = p1.then(function (_user) {
                if (_user) return { isSuccess : false, message: "user already exist" };
                else {
                    var _p = new userModel({
                        username: user.username, 
                        password: user.password, 
                        name: user.name,
                        number: user.number,
                        countryCode: user.countryCode
                    }).save().then(function (_user) {
                        return { isSuccess : true, user : _user };
                    }, function (err) {
                        if (err) return { isSuccess : false, message: err };
                    });
                    return _p;
                }
            }, function (err) { return err; });
            var p3 = roleModel.findOne({ name: "member" });
            return q.all([p1, p2, p3]).spread(function (p1Result, p2Result, p3Result) {
                if (!p2Result.isSuccess) {
                    return p2Result;
                }
                var p = new userInRoleModel({
                    user: p2Result.user._id,
                    role: p3Result._id,
                    isActive : true
                }).save().then(function (_data) {
                    return {
                        username : p2Result.user.username, 
                        name : p2Result.user.name, 
                        number: p2Result.user.countryCode + "-" + p2Result.user.number ,
                        role : p3Result.name
                    };
                }, function (err) { return err; });
                return p;
            }, function (err) { return err; });
        }
    }
});
