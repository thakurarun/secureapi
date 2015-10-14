var q = require("q");
var _ = require("underscore");
var mongoose = require('mongoose');
var userModel = mongoose.model('User');
var userInRoleModel = mongoose.model('UserInRole');
var roleModel = mongoose.model('Role');
var relationModel = mongoose.model('Relation');
module.exports = (function () {
    return {
        syncContacts: function (data) {
            data.contacts = data.contacts.filter(function (elem, pos) { return data.contacts.indexOf(elem) == pos; });
            var r1 = relationModel.findOne({ userId: data.userId });
            var r2 = r1.then(function (relation) {
                if (relation == null) {
                    var p1 = userModel.findOne({ _id: data.userId });
                    var p2 = p1.then(function success(user) {
                        return userModel.find({ number : { $in : data.contacts } }, { _id: 1 });
                    }, function fail(err) { console.log(err); return err });
                    return q.all([p1, p2]).spread(function (p1Result, p2Result) {
                        if (p1Result && p2Result) {
                            return new relationModel({
                                userId: p1Result._id, 
                                relations: p2Result.filter(function (i) {
                                    return !i._id.equals(p1Result._id);
                                }).map(function (i) { return i._id; })
                            }).save().then(function (relation) {
                                return { "data" : relation.relations.length + " contacts synced." };
                            }, function (err) { console.log(err); });
                        }
                    });
                } else {
                    //find new contacts that are not in relation
                    var p1 = userModel.find({ number : { $in : data.contacts }, _id : { $ne: relation.userId } }, { _id: 1 });
                    var p2 = p1.then(function (p1Result) {
                        return p1Result.filter(function (item) {
                            return relation.relations.indexOf(item._id) == -1;
                        });
                    }, function (err) { return err });
                    return q.all([p1, p2]).spread(function (p1Result, p2Result) {
                        //p2Result contain new contacts that are not in relation yet...
                        p2Result.forEach(function (rel) {
                            relation.relations.push(rel);
                        });
                        return relation.save().then(function (_relation) {
                            return { "data" : _relation.relations.length + " contacts synced." };
                        }, function (err) { console.log(err); });
                    });
                }
            }, function (err) { console.log(err); return err; });
            return q.all([r1, r2]).spread(function (r1Result, r2Result) {
                return r2Result;
            });
        }
    }
});
