var jwt = require('jsonwebtoken');
var userRepo = require("../Repositories/UserRepository.js")();
var syncRepo = require("../Repositories/ContactSyncRepository.js")();
module.exports = (function () {
    return {
        addUser : function (data) {
            return userRepo.addNewUser(data).then(function (data) {
                return data;
            }, function (reject) {
                return { isSuccess: false, message: reject }
            });
        },
        syncContacts : function (requestObject) {
            var data = {
                userId : requestObject.id,
                contacts : requestObject.contacts
            }
            return syncRepo.syncContacts(data).then(function (data) {
                return data;
            }, function (reject) {
                return { isSuccess: false, message: reject }
            });
        }
    };
})();

