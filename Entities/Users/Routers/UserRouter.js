module.exports = function (apiRoutes) {
    // route to test service (GET http://localhost:8080/api/)
    apiRoutes.get('/', function (req, res) {
        res.json({ message: 'Welcome to the coolest API on earth!' });
    });
    
    // route to return all users (GET http://localhost:8080/api/users)
    apiRoutes.get('/users', function (req, res) {
        res.json({ message: 'This should be secure!' });
    });
    return apiRoutes;
}