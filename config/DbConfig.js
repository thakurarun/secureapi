module.exports = {
    'database': 'mongodb://127.0.0.1:27017/secureapi',
    'options': {
        db: { native_parser: true },
        server: { poolSize: 5 },
        replset: {
            socketOptions : {
                keepAlive: 1
            }
        },
    }
};