var jwt = require('jsonwebtoken');
var authRepo = require("../Repositories/AuthenticationRepository.js")();
module.exports = (function () {
    return {
        authenticate : function (data) {
            return authRepo.Authenticate(data)
                .then(function (result, res) {
                if (!!result) {
                    authRepo.UpdateStatus(result.data);
                    return { userId: result.data._id, name : result.data.name, currentRole : result.data.rolename, IsSuccess: true };
                } else {
                    return { message : "User not exist" , IsSuccess: false };
                }
            }, function (error) {
                return { message : error , IsSuccess: false };
            });
        },
        isAuthenticated: function (req) {
            console.log("isAuthenticated");
        },
        signUser: function (data) {
            var token = jwt.sign(data.userId, secretkey, {
                expiresInMinutes: 1440 // expires in 24 hours
            });
            data.token = token;
            return data;
        }
    };
})();