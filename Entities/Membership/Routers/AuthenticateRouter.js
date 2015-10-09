var authService = require("../Services/AuthenticateService.js");
module.exports = function (apiRoutes) {
    // route to test service (GET http://localhost:8080/api/login)
    apiRoutes.post('/public/login', function (req, res) {
        authService.authenticate(req.body) 
        .then(function (cbResult) {
            if (cbResult.IsSuccess) {
               var data = authService.signUser(cbResult);
                res.json(data);
            } else {
                res.json(cbResult);
            }
        });
    }, function (rejected) {
        res.json({"reason":"failed"});
    });
    return apiRoutes;
}