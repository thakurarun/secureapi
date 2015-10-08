var authRepo = require("../Repositories.js")();
module.exports = (function () {
    return {
        authenticate : function (data) {
            return authRepo.Authenticate(data);
        },
        isAuthenticated: function (req) {
            console.log("isAuthenticated");
        }
    };
})();