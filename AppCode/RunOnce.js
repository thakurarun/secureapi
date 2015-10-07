var express = require('express');
var mongoose = require('mongoose');
var Promise = require('promise');

var userModel = mongoose.model('User');
var roleModel = mongoose.model('Role');
var userInRoleModel = mongoose.model('UserInRole');

var CreateRoles = function (callback) {
    var roles = ["admin", "typeA", "typeB", "typeC"];
    Array.prototype.forEach.call(roles, function (role, index) {
        new roleModel({
            name: role, 
            isActive: true
        }).save(function (err, resultRole) {
            if (err)
                console.log(err);
            if (resultRole.name == "admin") {
                callback(resultRole._id);
            }
        });
    });
}
var CreateAdmin = function (AdminRoleId) {
    admin = new userModel({
        name: "Admin",
        username: "admin", 
        password: "123456", 
        isActive: true
    }).save(function (err, newAdmin) {
        if (err) {
            console.log(err);
        } else {
            new userInRoleModel({
                userId: newAdmin._id,
                roleId: AdminRoleId,
                isActive : true
            }).save(function (err) {
                if (err)
                    console.log(err);
                console.log('admin created');
            });
        }
    });
}
module.exports = function (app) {
    roleModel.find({ name: "admin" }, function (err, role) {
        if (err)
            consol.log(err);
        else {
            if (!!role.length == false) {
                CreateRoles(function (adminId) {
                    CreateAdmin(adminId);
                });
            }
        }
    });
}
