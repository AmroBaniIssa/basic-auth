'use strict';
require('dotenv').config();
const express = require('express');
const basicAuth = require('./middlewars/basic.js')
const bearer = require('./middlewars/bearer.js');
const bcrypt = require('bcrypt');
const acl = require('./middlewars/acl.js');
const app = express();
app.use(express.json());
const authRouter = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./models/users.js');

const { users } = require('./models/users.js');
const sequelize = new Sequelize(process.env.DATABASE_URL, {});
const user = userModel(sequelize, DataTypes);

authRouter.post('/signup', async (req, res, next) => {
    try {
    let userRecord = await users.create(req.body);
    const output = {
        user: userRecord,
        token: userRecord.token
    };
    res.status(201).json(output);
} catch (e) {
    next(e.message)
}
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
    const user = {
        user: req.user,
        token: req.user.token
    };
    res.status(200).json(user);
});

module.exports = authRouter;

app.get('/myOrders', bearer, ordersHandler);



app.get('/img', bearer, acl('read'), imageHandler);
app.post('/img', bearer, acl('create'));
app.put('/img', bearer, acl('update'));
app.delete('/img', bearer, acl('delete'), imageDeleteHandler);



function ordersHandler(req, res) {
    res.json({
        'message': 'you can view the orders',
        'user': req.user
    });
}

function imageHandler(req, res) {
    res.status(200).json('you have the access');
}
function imageDeleteHandler(req, res) {
    res.status(200).json('you have the access');
}
module.exports = app;