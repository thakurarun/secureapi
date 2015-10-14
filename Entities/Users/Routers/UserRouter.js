var userService = require("../Services/UserService.js");
module.exports = function (apiRoutes) {
    // route to test service (GET http://localhost:8080/api/)
    apiRoutes.get('/', function (req, res) {
        res.json({ message: 'Welcome to the coolest API on earth!' });
    });
    
    // route to return all users (GET http://localhost:8080/api/users)
    apiRoutes.post('/secure/users', function (req, res) {
        res.json({ message: 'This should be secure!' });
    });
    apiRoutes.post('/secure/synccontacts', function (req, res) {
        userService.syncContacts(req.body).then(function (data) {
            res.json(data);
        }, function (err) {
            res.json(err);
        });
    });
    apiRoutes.post('/public/adduser', function (req, res) {
        userService.addUser(req.body).then(function (result) {
            res.json(result);
        }, function (failed) {
            res.json(failed);
        });
    });
    return apiRoutes;
}