var jwt = require('jsonwebtoken');
var userRepo = require("../Repositories/UserRepository.js")();
module.exports = (function () {
    return {
        addUser : function (data) {
            return userRepo.addNewUser(data).then(function (data) {
                return data;
            }, function (reject) {
                return { isSuccess: false, message: reject }
            });
        }
    };
})();