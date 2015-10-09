var q = require("q");
var mongoose = require('mongoose');
var userModel = mongoose.model('User');
var userInRoleModel = mongoose.model('UserInRole');
var loginStatus = mongoose.model('LoginStatus');
module.exports = (function () {
    return {
        Authenticate : function (data) {
            var options = {
                username : data.username,
                password : data.password,
                isActive : true
            };
            var p1 = userModel.findOne(options);
            var p2 = p1.then(function (data) {
                if (!!data)
                    return userInRoleModel
                    .findOne({ user: data._id, isActive: true })
                    .populate('role')
                    .exec();
            });
            return q.all([p1, p2]).spread(function (resultP1, resultP2) {
                if (!!resultP1 && !!resultP2) {//should be registered and has some role...
                    resultP1.rolename = resultP2.role.name;
                    return { "data" : resultP1 };
                }
                return null;
            });
        },
        UpdateStatus: function (data) {
            userInRoleModel.findOne({ user: data._id , isActive: true }).then(function (role) {
                var status = new loginStatus({
                    user: data._id,
                    role: role.roleId
                }).save(function () {
                    console.log("some body logged in...");
                });
            }, function (err) {
                console.log("Somthing wrong happen in Auth Repo");
                console.log(err);
            });
        }
    }
});
