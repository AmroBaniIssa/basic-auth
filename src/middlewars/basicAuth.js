'use strict';
const base64 = require('base-64');
const Users = require('../models/users.model');

function basic(req, res, next) {
    if (req.headers.authorization) {
        let headersParts = req.headers.authorization.split(" ");// ['Basic','c2hpaGFiOjEyMw==']
        let encodedValue = headersParts[1];
        let decodedValue = base64.decode(encodedValue);//username:password
        let [username, password] = decodedValue.split(":");
        console.log(username,password);
        Users.authBasic(username, password)
            .then((data) => {
                req.user = data;
                next();
            }).catch((error) => {
                next('invalid Login*');
            })
    }
}


module.exports = basic;