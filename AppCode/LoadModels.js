var path = require("path"),
    fs = require("fs");
module.exports = function () {
    var parentPath = path.join(__dirname, '../Entities');
    
    var walk = function (path) {
        fs.readdirSync(path).forEach(function (file) {
            var newPath = path + '/' + file;
            var fileStatus = fs.statSync(newPath);
            if (fileStatus.isFile()) {
                if (/(.*)\.(js$)/.test(file)) {
                    require(newPath);
                }
            }
            else if (fileStatus.isDirectory()) {
                walk(newPath);
            }
        });
    };

    var parentWalk = function (parentpath) {
        fs.readdirSync(parentpath).forEach(function (file) {
            var newPath = parentpath + '/' + file;
            var fileStatus = fs.statSync(newPath);
            if (fileStatus.isDirectory() && file == "Model") {
                walk(newPath);
            }
            else if (fileStatus.isDirectory()) {
                parentWalk(newPath);
            }
        });
    };
    parentWalk(parentPath);
}