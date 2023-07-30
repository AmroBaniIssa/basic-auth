'use strict';
require('dotenv').config();
const express = require('express');
const basic = require('./middlewars/basicAuth');
const bearer = require('./middlewars/bearerAuth');
const notFoundHandler = require('./handlers/404');
const errorHandler = require('./handlers/500');
const bcrypt = require('bcrypt');
const users = require('./models/users.model');
const app = express();
app.use(express.json());


app.post('/signup', async (req, res) => {
    let username = req.body.username;
    let hashedPassword = await bcrypt.hash(req.body.password, 5);
    const record = await users.create({
        username: username,
        password: hashedPassword
    });
    res.status(201).json(record);
});
app.post('/signin', basic, loginHandler);

app.get('/secrets', bearer, secretsHandler)
app.get('/', bearer, homeHandler)


function loginHandler(req, res) {
    res.status(200).json(req.user);


}
function homeHandler(req, res) {
    res.status(200).json("welcome");


}
app.use('*', notFoundHandler);
app.use(errorHandler)
function secretsHandler(req, res) {
    res.status(200).json({
        'message': 'welcom',
        'user': req.user
    });
}

module.exports = app;